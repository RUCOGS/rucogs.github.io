import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { defaultUserOptions, UserOptions } from '@pages/users/user-page/classes';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService } from '@src/app/services/backend.service';
import { SecurityService } from '@src/app/services/security.service';
import { BreakpointManagerService } from '@src/app/services/_services.module';
import { deepClone } from '@src/app/utils/utils';
import { InviteType, Permission, ProjectInviteSubscriptionFilter, User } from '@src/generated/graphql-endpoint.types';
import { UserFilterInput } from '@src/generated/model.types';
import { OperationSecurityDomain } from '@src/shared/security';
import { gql } from 'apollo-angular';
import { firstValueFrom, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css'],
})
export class UserPageComponent implements OnInit, OnDestroy {
  user: PartialDeep<User> = {};
  userOptions: UserOptions = defaultUserOptions();

  private username: string = '';
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

    const userResult = await firstValueFrom(
      this.backend.withAuth().query<{
        users: any[];
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
              createdAt
              updatedAt
              classYear
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
              eBoard {
                id
                createdAt
                updatedAt
                bio
                avatarLink
                terms {
                  id
                  year
                  roles {
                    roleCode
                  }
                }
              }
            }
          }
        `,
        variables: {
          filter: <UserFilterInput>{
            username: { eq: this.username },
          },
        },
        ...(invalidateCache && { fetchPolicy: 'no-cache' }),
      }),
    );

    if (userResult.data.users.length == 0) {
      this.userOptions.nonExistent = true;
      this.userOptions.loaded = true;
      return;
    }
    let user: PartialDeep<User> = deepClone(userResult.data.users[0]);
    user.eBoard?.terms?.sort((a, b) => b!.year! - a!.year!);
    const userOpDomain = <OperationSecurityDomain>{
      userId: user.id,
    };
    const permCalc = this.security.makePermCalc().withDomain(userOpDomain);
    this.userOptions.canUpdateUser = permCalc.hasPermission(Permission.UpdateUser);
    this.userOptions.canDeleteUser = permCalc.hasPermission(Permission.DeleteUser);
    this.userOptions.canManageUserRoles = permCalc.hasPermission(Permission.ManageUserRoles);
    this.userOptions.canManageEBoardRoles = permCalc.hasPermission(Permission.ManageEboardRoles);
    this.userOptions.canManageEBoard = permCalc.hasPermission(Permission.ManageEboard);
    this.userOptions.canManageMetadata = permCalc.hasPermission(Permission.ManageMetadata);
    this.userOptions.canUpdateUserPrivate = permCalc.hasPermission(Permission.UpdateUserPrivate);
    if (!this.userOptions.canDeleteUser) {
      this.userOptions.deleteUserTooltip = `Please ask an e-board officer if you'd like to delete your profile.`;
    }
    if ((user.projectMembers?.length ?? 0) > 0) {
      this.userOptions.canDeleteUser = false;
      this.userOptions.deleteUserTooltip = `Cannot delete user that is still in a project!`;
    }
    this.userOptions.hasProjects = (user.projectMembers?.length ?? 0) > 0;

    if (
      this.security
        .makePermCalc()
        .withDomain({
          userId: user.id!,
        })
        .hasPermission(Permission.ReadUserPrivate)
    ) {
      const privateUserResult = await firstValueFrom(
        this.backend
          .withAuth()
          .withOpDomain({
            userId: user.id!,
          })
          .query<{
            users: any[];
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
            ...(invalidateCache && { fetchPolicy: 'no-cache' }),
          }),
      );
      if (privateUserResult.error || privateUserResult.data.users.length === 0) return;
      user = {
        ...user,
        ...privateUserResult.data.users[0],
      };
    }

    if (this.security.securityContext?.userId) {
      const invitesOpDomains = this.security.getOpDomainsFromPermission(Permission.ManageProjectInvites);
      // TODO NOW: Wait for typetta to fix querying with empty operation domain
      if ((invitesOpDomains && invitesOpDomains.length > 0) || invitesOpDomains === undefined) {
        const invitesResult =
          this.security.securityContext && this.userOptions.canUpdateUser
            ? await firstValueFrom(
                this.backend
                  .withAuth()
                  .withOpDomains(invitesOpDomains)
                  .query<{
                    projectInvites: {
                      id: string;
                      type: InviteType;
                      project: {
                        id: string;
                        name: string;
                        cardImageLink: string;
                      };
                    }[];
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
                    ...(invalidateCache && { fetchPolicy: 'no-cache' }),
                  }),
              )
            : undefined;

        if (invitesResult && !invitesResult.error) {
          user.projectInvites = invitesResult.data.projectInvites;
        }
      } else {
        user.projectInvites = [];
      }

      this.userOptions.loaded = true;
      // Set user last to let angular propagate it.
      this.user = user;
    }
  }

  setupSubscribers() {
    // Only realtime subscriptions for people editing their profile
    if (!this.security.securityContext?.userId || !this.userOptions.canUpdateUser) return;

    const inviteSubFilter = <ProjectInviteSubscriptionFilter>{
      userId: this.security.securityContext.userId,
    };

    this.backend
      .subscribe<{
        projectInviteCreated: string;
      }>({
        query: gql`
          subscription ($filter: ProjectInviteSubscriptionFilter!) {
            projectInviteCreated(filter: $filter) {
              id
            }
          }
        `,
        variables: {
          filter: inviteSubFilter,
        },
      })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (value) => {
          if (inviteSubFilter.projectId) this.uiMessageService.notifyInfo('New invite!');
          this.fetchData(true);
        },
      });

    this.backend
      .subscribe<{
        projectInviteDeleted: string;
      }>({
        query: gql`
          subscription ($filter: ProjectInviteSubscriptionFilter!) {
            projectInviteDeleted(filter: $filter) {
              id
            }
          }
        `,
        variables: {
          filter: inviteSubFilter,
        },
      })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (value) => {
          if (inviteSubFilter.projectId) this.uiMessageService.notifyInfo('Invite deleted!');
          this.fetchData(true);
        },
      });
  }
}
