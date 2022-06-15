import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { AuthService } from '@src/app/services/auth.service';
import { BackendService } from '@src/app/services/backend.service';
import { BreakpointManagerService } from '@src/app/services/breakpoint-manager.service';
import { SecurityService } from '@src/app/services/security.service';
import { deepClone } from '@src/app/utils/utils';
import { Access, InviteType, Permission, Project, ProjectInvite, ProjectInviteSubscriptionFilter, RoleCode } from '@src/generated/graphql-endpoint.types';
import { ProjectFilterInput, ProjectInviteFilterInput } from '@src/generated/model.types';
import { OperationSecurityDomain } from '@src/shared/security';
import { gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';

export const DefaultProjectOptions = {
  isMember: false, 
  nonExistent: false,
  hasEditPerms: false,
  inviteSent: false,
}

export type ProjectOptions = {
  isMember: boolean
  nonExistent: boolean
  hasEditPerms: boolean
  inviteSent: boolean
}

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {

  project: PartialDeep<Project> = {};
  projectOptions: ProjectOptions = DefaultProjectOptions;
  
  private projectId: string = "";
  private onDestroy$ = new Subject<void>();

  constructor(
    public breakpointManager: BreakpointManagerService,
    private activatedRoute: ActivatedRoute, 
    private backend: BackendService,
    private security: SecurityService,
    private authService: AuthService,
    private uiMessageService: UIMessageService,
  ) {}
  
  ngOnInit() {
    this.activatedRoute.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(async (params) => {
      // TODO:      
      this.projectId = params.get('projectId') as string;

      await this.security.waitUntilReady();

      await this.fetchData(true);
      this.setupSubscribers();
    });
  }
  
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  async fetchData(invalidateCache: boolean = false) {
    await this.security.fetchData();

    const invitesOpDomain = this.security.getOpDomainFromPermission(
      Permission.ManageProjectInvites, 
      [ 'projectInviteId' ]
    );
    const invitesQuery = this.security.securityContext ? this.backend.withAuth()
    .withOpDomain(invitesOpDomain)
    .query<{
      projectInvites: {
        id: string
        type: InviteType
        user: {
          id: string
          displayName: string
          username: string
          avatarLink: string
        }
      }[]
    }>({
      query: gql`
        query FetchProjectPageInvites($filter: ProjectInviteFilterInput) {
          projectInvites(filter: $filter) {
            id
            type
            user {
              id
              displayName
              username
              avatarLink
            }
          }
        }
      `,
      variables: {
        filter: <ProjectInviteFilterInput>{
          projectId: { eq: this.projectId }
        }
      },
      ...(invalidateCache && { fetchPolicy: 'no-cache' })
    }).toPromise() : undefined;

    const projectOpDomain = <OperationSecurityDomain>{
      projectId: [ this.projectId ]
    }
    const permCalc = this.security.makePermCalc().withDomain(projectOpDomain);
    this.projectOptions.hasEditPerms = permCalc.hasPermission(Permission.UpdateProject);
    const projectQuery = this.backend.withAuth().withOpDomain({
      projectId: [ this.projectId ]
    }).query<{
      projects: {
        id: string,
        cardImageLink: string
        bannerLink: string
        completedAt: Date
        createdAt: Date
        updatedAt: Date
        name: string
        access: Access
        pitch: string
        description: string
        downloadLinks: string[]
        members: {
          id: string,
          contributions: string
          user: {
            id: string
            avatarLink: string
            username: string
            displayName: string
          }
          roles: {
            roleCode: RoleCode
          }[]
        }[]
      }[]
    }>({
      query: gql`
        query FetchProjectPageProject($filter: ProjectFilterInput) {
          projects(filter: $filter) {
            id
            cardImageLink
            bannerLink
            completedAt
            createdAt
            updatedAt
            name
            access
            pitch
            description
            downloadLinks
            members {
              id
              user {
                id
                avatarLink
                username
                displayName
              }
              contributions
              roles {
                roleCode
              }
            }
          }
        }
      `,
      variables: {
        filter: <ProjectFilterInput>{
          id: { eq: this.projectId }
        }
      },
      ...(invalidateCache && { fetchPolicy: 'no-cache' })
    }).toPromise();

    const [invitesResult, projectResult] = await Promise.all([invitesQuery, projectQuery]);

    if (projectResult.data.projects.length == 0) {
      this.projectOptions.nonExistent = true;
      return;
    }

    this.project = deepClone(projectResult.data.projects[0]);
    if (invitesResult && !invitesResult.error) {
      this.project.invites = invitesResult.data.projectInvites;
    }

    this.projectOptions.inviteSent = this.project.invites?.some(x => 
      x?.type === InviteType.Incoming && 
      x?.user?.id === this.security.securityContext?.userId
    ) ?? false;
    this.projectOptions.hasEditPerms = permCalc.hasPermission(Permission.UpdateProject);

    if (this.authService.authenticated)
      this.projectOptions.isMember = this.project.members?.some(x => x?.user?.id === this.authService.getPayload()?.user.id) ?? false;
  }

  setupSubscribers() {
    if (!this.security.securityContext?.userId)
      return;
    
    let inviteSubFilter = <ProjectInviteSubscriptionFilter>{
      userId: this.security.securityContext.userId,
      projectId: this.projectId
    }
    if (this.projectOptions.hasEditPerms) {
      inviteSubFilter = {
        projectId: this.projectId
      }
    }

    this.backend.subscribe<{
      projectInviteCreated: ProjectInvite
    }>({
      query: gql`
        subscription($filter: ProjectInviteSubscriptionFilter!) {
          projectInviteCreated(filter: $filter)
        }
      `,
      variables: {
        filter: inviteSubFilter
      },
    }).pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (value) => {
        if (this.projectOptions.hasEditPerms)
          this.uiMessageService.notifyInfo("New invite!")
        this.fetchData(true);
      }
    });

    this.backend.subscribe<{
      projectInviteDeleted: string
    }>({
      query: gql`
        subscription($filter: ProjectInviteSubscriptionFilter!) {
          projectInviteDeleted(filter: $filter)
        }
      `,
      variables: {
        filter: inviteSubFilter
      },
    }).pipe(takeUntil(this.onDestroy$))
    .subscribe({
      next: (value) => {
        this.uiMessageService.notifyInfo("Invite rejected!")
        this.fetchData(true);
      }
    });
  }
}