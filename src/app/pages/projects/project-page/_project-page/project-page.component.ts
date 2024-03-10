import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { defaultProjectOptions, ProjectOptions } from '@pages/projects/project-page/classes';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { AuthService } from '@src/app/services/auth.service';
import { BackendService } from '@src/app/services/backend.service';
import { BreakpointManagerService } from '@src/app/services/breakpoint-manager.service';
import { SecurityService } from '@src/app/services/security.service';
import { SEOService } from '@src/app/services/seo.service';
import { deepClone } from '@src/app/utils/utils';
import {
  InviteType,
  Permission,
  Project,
  ProjectInvite,
  ProjectInviteSubscriptionFilter,
  ProjectMember,
  ProjectMemberSubscriptionFilter,
} from '@src/generated/graphql-endpoint.types';
import { ProjectFilterInput, ProjectInviteFilterInput } from '@src/generated/model.types';
import { OperationSecurityDomain } from '@src/shared/security';
import { gql } from 'apollo-angular';
import { firstValueFrom, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';

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
    private seoService: SEOService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.pipe(takeUntil(this.onDestroy$)).subscribe(async (params) => {
      this.projectId = params.get('projectId') as string;

      await this.security.waitUntilReady();

      await this.fetchData();
      this.setupSubscribers();
      this.seoService.update({
        titleAll: this.project.name,
        descriptionAll: this.project.description,
        ogImage: this.project.cardImageLink,
        twitterCard: 'summary_large_image',
      });
    });
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  async fetchData(invalidateCache: boolean = false, invalidateSecurityCache: boolean = false) {
    if (invalidateSecurityCache) {
      await this.security.fetchData();
      await this.backend.cacheEvict({
        id: `Project:${this.projectId}`,
      });
    }

    this.projectOptions.isAuthenticated = this.security.securityContext?.userId != undefined;
    const projectOpDomain = <OperationSecurityDomain>{
      projectId: this.projectId,
    };
    const permCalc = this.security.makePermCalc().withDomain(projectOpDomain);

    let discordResult, invitesResult, projectResult;

    try {
      let invitesQuery;
      if (this.security.securityContext?.userId) {
        let invitesOpDomains: OperationSecurityDomain[] | undefined = this.security.getOpDomainsFromPermission(
          Permission.ManageProjectInvites,
        );

        invitesQuery = firstValueFrom(
          this.backend
            .withAuth()
            .withOpDomains(invitesOpDomains)
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
              ...(invalidateCache && { fetchPolicy: 'network-only' }),
            }),
        );
      }

      let discordQuery;
      if (permCalc.hasPermission(Permission.ManageProjectDiscord)) {
        discordQuery = firstValueFrom(
          this.backend
            .withAuth()
            .withOpDomain({
              projectId: this.projectId,
            })
            .query<{
              projectDiscordConfig: any[];
            }>({
              query: gql`
                query FetchProjectPageDiscord {
                  projectDiscordConfigs {
                    id
                    createdAt
                    updatedAt
                    categoryId
                  }
                }
              `,
            }),
        );
      }

      const projectQuery = firstValueFrom(
        this.backend.withAuth().query<{
          projects: any[];
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
                    bannerLink
                    bio
                    classYear
                    netId
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
          ...(invalidateCache && { fetchPolicy: 'network-only' }),
        }),
      );

      [discordResult, invitesResult, projectResult] = await Promise.all([discordQuery, invitesQuery, projectQuery]);
    } catch {
      this.projectOptions.nonExistent = true;
      this.projectOptions.loaded = true;
      return;
    }

    if (projectResult.data.projects.length == 0) {
      this.projectOptions.nonExistent = true;
      this.projectOptions.loaded = true;
      return;
    }
    this.projectOptions.canUpdateProject = permCalc.hasPermission(Permission.UpdateProject);
    this.projectOptions.canDeleteProject = permCalc.hasPermission(Permission.DeleteProject);
    this.projectOptions.canManageMetadata = permCalc.hasPermission(Permission.ManageMetadata);
    this.projectOptions.canCreateProjectMember = permCalc.hasPermission(Permission.CreateProjectMember);
    this.projectOptions.canJoinProject = permCalc.hasPermission(Permission.JoinProject);
    this.project = deepClone(projectResult.data.projects[0]);
    if (invitesResult && !invitesResult.error) {
      this.project.invites = invitesResult.data.projectInvites;
    }
    if (discordResult && !discordResult.error) {
      this.project.discordConfig = discordResult.data.projectDiscordConfigs[0];
    }

    this.projectOptions.manageSomeMembers = permCalc
      .withDomains(
        this.project.members?.map((x) => ({
          projectMemberId: x?.id ?? '',
        })) ?? [],
      )
      .hasPermission(Permission.ManageProjectMember);

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
          subscription OnProjectInviteCreated($filter: ProjectInviteSubscriptionFilter) {
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
          if (this.projectOptions.canUpdateProject) this.uiMessageService.notifyInfo('New invite!');
          this.fetchData(true, true);
        },
      });

    this.backend
      .subscribe<{
        projectInviteDeleted: ProjectInvite;
      }>({
        query: gql`
          subscription OnProjectInviteDeleted($filter: ProjectInviteSubscriptionFilter) {
            projectInviteDeleted(filter: $filter) {
              userId
            }
          }
        `,
        variables: {
          filter: inviteSubFilter,
        },
      })
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: async (value) => {
          const deletedInvite = value.data?.projectInviteDeleted;
          await this.fetchData(true, true);
          if (this.project.members?.some((x) => x?.user?.id === deletedInvite?.userId))
            this.uiMessageService.notifyInfo('Invite accepted!');
          else this.uiMessageService.notifyInfo('Invite rejected!');
        },
      });

    this.backend
      .subscribe<{
        projectMemberDeleted: ProjectMember;
      }>({
        query: gql`
          subscription OnProjectMemberDeleted($filter: ProjectMemberSubscriptionFilter) {
            projectMemberDeleted(filter: $filter) {
              userId
            }
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
          const deletedMember = value.data?.projectMemberDeleted;
          if (deletedMember?.userId === this.security.securityContext?.userId) {
            this.uiMessageService.notifyInfo('You were kicked!');
          } else this.uiMessageService.notifyInfo('Member kicked!');
          await this.fetchData(true, true);
          console.log('result after fetch data: ', this.projectOptions);
          if (this.projectOptions.nonExistent) {
            console.log("Project doesn't exist, navigating out");
            // This project was just deleted, so we leave
            this.router.navigateByUrl('/projects');
          }
        },
      });

    this.backend
      .subscribe<{
        projectMemberCreated: ProjectMember;
      }>({
        query: gql`
          subscription OnProjectMemberCreated($filter: ProjectMemberSubscriptionFilter) {
            projectMemberCreated(filter: $filter) {
              id
            }
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
          await this.fetchData(true, true);
        },
      });
  }
}
