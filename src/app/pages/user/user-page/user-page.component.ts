import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService } from '@src/app/services/backend.service';
import { SecurityService } from '@src/app/services/security.service';
import { BreakpointManagerService } from '@src/app/services/_services.module';
import { deepClone } from '@src/app/utils/utils';
import { InviteType, Permission, ProjectInviteSubscriptionFilter, User } from '@src/generated/graphql-endpoint.types';
import { ProjectInviteFilterInput, UserFilterInput } from '@src/generated/model.types';
import { OperationSecurityDomain } from '@src/shared/security';
import { gql } from 'apollo-angular';
import { firstValueFrom, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';

export function defaultUserOptions() {
  return <UserOptions>{
    hasEditPerms: false,
    nonExistent: false,
    hasProjects: false,
    deleteUserTooltip: "",
    canDeleteUser: false,
    loaded: false,
  };
}

export type UserOptions = {
  hasEditPerms: boolean
  nonExistent: boolean
  hasProjects: boolean
  deleteUserTooltip: string
  canDeleteUser: boolean
  loaded: boolean
}

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit, OnDestroy {
  
  user: PartialDeep<User> = {};
  userOptions: UserOptions = defaultUserOptions();

  tabLinks = [
    {
      matIcon: 'add',
      label: 'First',
      link: './first',
    }, {
      matIcon: 'add',
      label: 'Second',
      link: './second',
    }, {
      matIcon: 'add',
      label: 'Third',
      link: './third',
    }, 
  ];

  private username: string = "";
  protected onDestroy$ = new Subject<void>();

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
      this.setupSubscribers();
    });
  }
  
  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  async fetchData(invalidateCache: boolean = false) {
    await this.security.fetchData();

    const userResult = await firstValueFrom(this.backend.withAuth().query<{
      users: any[]
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
            projectMembers {
              id
              projectId
            }
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
    }));

    if (userResult.data.users.length == 0) {
      this.userOptions.nonExistent = true;
      this.userOptions.loaded = true;
      return;
    }
    let user: PartialDeep<User> = deepClone(userResult.data.users[0]);
    const userOpDomain = <OperationSecurityDomain>{
      userId: [ user.id ]
    }
    const permCalc = this.security.makePermCalc().withDomain(userOpDomain);
    console.log(this.security.securityContext);
    this.userOptions.hasEditPerms = permCalc.hasPermission(Permission.UpdateUser);
    this.userOptions.canDeleteUser = permCalc.hasPermission(Permission.DeleteUser);
    if (!this.userOptions.canDeleteUser) {
      this.userOptions.deleteUserTooltip = `Please ask an e-board officer if you'd like to delete your profile.`;
    }
    if ((user.projectMembers?.length ?? 0) > 0) {
      this.userOptions.canDeleteUser = false;
      this.userOptions.deleteUserTooltip = `Cannot delete user that is still in a project!`;
    }
    this.userOptions.hasProjects = (user.projectMembers?.length ?? 0) > 0;

    if (this.security.makePermCalc()
      .withDomain({
        userId: [ user.id! ]
      }).hasPermission(Permission.ReadUserPrivate)
    ) {
      const privateUserResult = await firstValueFrom(this.backend.withAuth()
      .withOpDomain({
        userId: [ user.id! ]
      }).query<{
        users: any[]
      }>({
        query: gql`
          query FetchUserPagePrivateUser {
            users {
              email
              loginIdentities {
                id
                name
                identityId
                data
              }
            }
          }
        `,
        ...(invalidateCache && { fetchPolicy: 'no-cache' })
      }));
      if (privateUserResult.error || privateUserResult.data.users.length === 0)
        return;
      user = {
        ...user,
        ...privateUserResult.data.users[0]
      }
    }

    if (this.security.securityContext?.userId) {
      const invitesOpDomain = this.security.getOpDomainFromPermission(
        Permission.ManageProjectInvites, 
        [ 'projectInviteId' ]
      );
      const invitesResult = (this.security.securityContext && this.userOptions.hasEditPerms) ? await firstValueFrom(this.backend.withAuth()
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
            userId: { eq: user.id }
          }
        },
        ...(invalidateCache && { fetchPolicy: 'no-cache' })
      })) : undefined;

      if (invitesResult && !invitesResult.error) {
        user.projectInvites = invitesResult.data.projectInvites;
      }
    }

    this.userOptions.loaded = true;
    // Set user last to let angular propagate it.
    this.user = user;
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