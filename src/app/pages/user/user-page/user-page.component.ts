import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService } from '@src/app/services/backend.service';
import { SecurityService } from '@src/app/services/security.service';
import { BreakpointManagerService } from '@src/app/services/_services.module';
import { deepClone } from '@src/app/utils/utils';
import { InviteType, Permission, ProjectInvite, ProjectInviteSubscriptionFilter, RoleCode, User } from '@src/generated/graphql-endpoint.types';
import { ProjectInviteFilterInput, UserFilterInput } from '@src/generated/model.types';
import { OperationSecurityDomain } from '@src/shared/security';
import { gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';

export const DefaultUserOptions = {
  hasEditPerms: false,
  nonExistent: false,
  hasProjects: false,
}

export type UserOptions = {
  hasEditPerms: boolean
  nonExistent: boolean
  hasProjects: boolean
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {
  
  user: PartialDeep<User> = {};
  userOptions: UserOptions = DefaultUserOptions;

  private username: string = "";
  private onDestroy$ = new Subject<void>();

  constructor(
    public breakpointManager: BreakpointManagerService,
    private activatedRoute: ActivatedRoute, 
    private backend: BackendService,
    private security: SecurityService,
    private uiMessageService: UIMessageService,
  ) {}
  
  ngOnInit() {
    this.activatedRoute.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(async (params) => {
      this.username = params.get('username') as string;
      
      await this.security.waitUntilReady();

      await this.fetchData(true);
      // this.setupSubscribers();
    });
  }
  
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  async fetchData(invalidateCache: boolean = false) {
    await this.security.fetchData();
    
    const userResult = await this.backend.withAuth().query<{
      users: {
        id: string,
        username: string,
        displayName: string,
        avatarLink: string
        bannerLink: string
        bio: string
        socials: {
          id: string
          link: string
          platform: string
          username: string
        }[]
        roles: {
          roleCode: RoleCode
        }[]
      }[]
    }>({
      query: gql`
        query FetchUserPageUser($filter: UserFilterInput) {
          users(filter: $filter) {
            id
            username
            displayName
            avatarLink
            bannerLink
            bio
            socials {
              id
              link
              platform
              username
            }
            roles {
              roleCode
            }
          }
        }
      `,
      variables: {
        filter: <UserFilterInput>{
          username: { eq: this.username }
        }
      },
      ...(invalidateCache && { fetchPolicy: 'no-cache' })
    }).toPromise();

    if (userResult.data.users.length == 0) {
      this.userOptions.nonExistent = true;
      return;
    }
    this.user = deepClone(userResult.data.users[0]);
    const userOpDomain = <OperationSecurityDomain>{
      userId: [ this.user.id ]
    }
    const permCalc = this.security.makePermCalc().withDomain(userOpDomain);
    this.userOptions.hasEditPerms = permCalc.hasPermission(Permission.UpdateUser);

    const invitesOpDomain = this.security.getOpDomainFromPermission(
      Permission.ManageProjectInvites, 
      [ 'projectInviteId' ]
    );
    const invitesResult = (this.security.securityContext && this.userOptions.hasEditPerms) ? await this.backend.withAuth()
    .withOpDomain(invitesOpDomain)
    .query<{
      projectInvites: {
        id: string
        type: InviteType
        project: {
          id: string
          name: string
          cardImageLink: string
        }
      }[]
    }>({
      query: gql`
        query FetchUserPageInvites($filter: ProjectInviteFilterInput) {
          projectInvites(filter: $filter) {
            id
            type
            project {
              id
              name
              cardImageLink
            }
          }
        }
      `,
      variables: {
        filter: <ProjectInviteFilterInput>{
          projectId: { eq: this.user.id }
        }
      },
      ...(invalidateCache && { fetchPolicy: 'no-cache' })
    }).toPromise() : undefined;

    if (invitesResult && !invitesResult.error) {
      this.user.projectInvites = invitesResult.data.projectInvites;
    }
  }

  setupSubscribers() {
    // Only realtime subscriptions for people editing their profile
    if (!this.security.securityContext?.userId || !this.userOptions.hasEditPerms)
      return;
    
    const inviteSubFilter = <ProjectInviteSubscriptionFilter>{
      userId: this.security.securityContext.userId,
    }

    this.backend.subscribe<{
      projectInviteCreated: string
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
        if (inviteSubFilter.projectId)
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
        if (inviteSubFilter.projectId)
          this.uiMessageService.notifyInfo("Invite deleted!")
        this.fetchData(true);
      }
    });
  }
}