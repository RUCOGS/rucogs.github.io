import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { AuthService } from '@src/app/services/auth.service';
import { BackendService } from '@src/app/services/backend.service';
import { BreakpointManagerService } from '@src/app/services/breakpoint-manager.service';
import { SecurityService } from '@src/app/services/security.service';
import { deepClone } from '@src/app/utils/utils';
import {
  Access,
  InviteType,
  Permission,
  Project,
  ProjectInvite,
  ProjectInviteSubscriptionFilter,
  ProjectMemberSubscriptionFilter,
  RoleCode,
} from '@src/generated/graphql-endpoint.types';
import { ProjectFilterInput, ProjectInviteFilterInput } from '@src/generated/model.types';
import { OperationSecurityDomain } from '@src/shared/security';
import { gql } from 'apollo-angular';
import { firstValueFrom, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';

export function defaultProjectOptions() {
  return <ProjectOptions>{
    isMember: false,
    manageSomeMembers: false,
    nonExistent: false,
    canUpdateProject: false,
    inviteSent: false,
    isAuthenticated: false,
    loaded: false,
    canDeleteProject: false,
  };
}

export type ProjectOptions = {
  isMember: boolean;
  manageSomeMembers: boolean;
  nonExistent: boolean;
  canUpdateProject: boolean;
  canDeleteProject: boolean;
  inviteSent: boolean;
  isAuthenticated: boolean;
  loaded: boolean;
};

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css'],
})
export class ProjectPageComponent implements OnInit {
  project: PartialDeep<Project> = {};
  projectOptions: ProjectOptions = defaultProjectOptions();

  private projectId: string = '';
  protected onDestroy$ = new Subject<void>();

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

    this.projectOptions.isAuthenticated = this.security.securityContext?.userId != undefined;

    let invitesQuery;
    if (this.security.securityContext?.userId) {
      let invitesOpDomain: OperationSecurityDomain | undefined = this.security.getOpDomainFromPermission(
        Permission.ManageProjectInvites,
        ['projectInviteId'],
      );

      if (!invitesOpDomain || (invitesOpDomain && (invitesOpDomain.projectInviteId?.length ?? 0) > 0)) {
        invitesQuery = firstValueFrom(
          this.backend
            .withAuth()
            .withOpDomain(invitesOpDomain)
            .query<{
              projectInvites: {
                id: string;
                type: InviteType;
                user: {
                  id: string;
                  displayName: string;
                  username: string;
                  avatarLink: string;
                };
              }[];
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
                  projectId: { eq: this.projectId },
                },
              },
              ...(invalidateCache && { fetchPolicy: 'no-cache' }),
            }),
        );
      }
    }

    const projectQuery = firstValueFrom(
      this.backend
        .withAuth()
        .withOpDomain({
          projectId: [this.projectId],
        })
        .query<{
          projects: {
            id: string;
            cardImageLink: string;
            bannerLink: string;
            completedAt: Date;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            access: Access;
            pitch: string;
            description: string;
            tags: string[];
            galleryImageLinks: string[];
            soundcloudEmbedSrc: string;
            downloadLinks: string[];
            members: {
              id: string;
              contributions: string;
              user: {
                id: string;
                avatarLink: string;
                username: string;
                displayName: string;
              };
              roles: {
                roleCode: RoleCode;
              }[];
            }[];
          }[];
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
                tags
                galleryImageLinks
                soundcloudEmbedSrc
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
              id: { eq: this.projectId },
            },
          },
          ...(invalidateCache && { fetchPolicy: 'no-cache' }),
        }),
    );

    const [invitesResult, projectResult] = await Promise.all([invitesQuery, projectQuery]);

    if (projectResult.data.projects.length == 0) {
      this.projectOptions.nonExistent = true;
      this.projectOptions.loaded = true;
      return;
    }

    const projectOpDomain = <OperationSecurityDomain>{
      projectId: [this.projectId],
    };
    const permCalc = this.security.makePermCalc().withDomain(projectOpDomain);
    this.projectOptions.canUpdateProject = permCalc.hasPermission(Permission.UpdateProject);
    this.projectOptions.canDeleteProject = permCalc.hasPermission(Permission.DeleteProject);

    this.project = deepClone(projectResult.data.projects[0]);
    if (invitesResult && !invitesResult.error) {
      this.project.invites = invitesResult.data.projectInvites;
    }

    if (
      permCalc
        .withDomain({
          projectMemberId: this.project.members?.map((x) => x?.id ?? '') ?? [],
        })
        .hasPermission(Permission.ManageProjectMember)
    )
      this.projectOptions.manageSomeMembers = true;

    this.projectOptions.inviteSent =
      this.project.invites?.some(
        (x) => x?.type === InviteType.Incoming && x?.user?.id === this.security.securityContext?.userId,
      ) ?? false;
    this.projectOptions.canUpdateProject = permCalc.hasPermission(Permission.UpdateProject);

    if (this.authService.authenticated)
      this.projectOptions.isMember =
        this.project.members?.some((x) => x?.user?.id === this.authService.getPayload()?.user.id) ?? false;

    // TODO: Set this to true after finishing loading page
    this.projectOptions.loaded = true;
  }

  setupSubscribers() {
    if (!this.security.securityContext?.userId) return;

    let inviteSubFilter = <ProjectInviteSubscriptionFilter>{
      userId: this.security.securityContext.userId,
      projectId: this.projectId,
    };
    if (this.projectOptions.canUpdateProject) {
      inviteSubFilter = {
        projectId: this.projectId,
      };
    }

    this.backend
      .subscribe<{
        projectInviteCreated: ProjectInvite;
      }>({
        query: gql`
          subscription OnProjectInviteCreated($filter: ProjectInviteSubscriptionFilter!) {
            projectInviteCreated(filter: $filter)
          }
        `,
        variables: {
          filter: inviteSubFilter,
        },
      })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (value) => {
          if (this.projectOptions.canUpdateProject) this.uiMessageService.notifyInfo('New invite!');
          this.fetchData(true);
        },
      });

    this.backend
      .subscribe<{
        projectInviteDeleted: string;
      }>({
        query: gql`
          subscription OnProjectInviteDeleted($filter: ProjectInviteSubscriptionFilter!) {
            projectInviteDeleted(filter: $filter)
          }
        `,
        variables: {
          filter: inviteSubFilter,
        },
      })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: async (value) => {
          const deletedInvite = this.project.invites?.find((x) => x?.id === value.data?.projectInviteDeleted);
          await this.fetchData(true);
          if (this.project.members?.some((x) => x?.user?.id === deletedInvite?.user?.id))
            this.uiMessageService.notifyInfo('Invite accepted!');
          else this.uiMessageService.notifyInfo('Invite rejected!');
        },
      });

    this.backend
      .subscribe<{
        projectMemberDeleted: string;
      }>({
        query: gql`
          subscription OnProjectMemberDeleted($filter: ProjectMemberSubscriptionFilter!) {
            projectMemberDeleted(filter: $filter)
          }
        `,
        variables: {
          filter: <ProjectMemberSubscriptionFilter>{
            projectId: this.projectId,
          },
        },
      })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: async (value) => {
          const deletedMember = this.project.members?.find((x) => x?.id === value.data?.projectMemberDeleted);
          if (deletedMember?.user?.id === this.security.securityContext?.userId)
            this.uiMessageService.notifyInfo('You were kicked!');
          else this.uiMessageService.notifyInfo('Member kicked!');
          await this.fetchData(true);
        },
      });

    this.backend
      .subscribe<{
        projectMemberCreated: string;
      }>({
        query: gql`
          subscription OnProjectMemberCreated($filter: ProjectMemberSubscriptionFilter!) {
            projectMemberCreated(filter: $filter)
          }
        `,
        variables: {
          filter: <ProjectMemberSubscriptionFilter>{
            projectId: this.projectId,
          },
        },
      })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: async (value) => {
          if (this.projectOptions.canUpdateProject) this.uiMessageService.notifyInfo('Member added!');
          await this.fetchData(true);
        },
      });
  }
}
