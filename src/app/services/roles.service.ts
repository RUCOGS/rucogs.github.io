import { Injectable, OnDestroy } from '@angular/core';
import { RoleCode } from '@src/generated/graphql-endpoint.types';
import { EBoardTermFilterInput, ProjectMemberFilterInput, UserFilterInput } from '@src/generated/model.types';
import { getHighestRoles, getRolesBelowRoles, RoleData, RoleType } from '@src/shared/security';
import { gql } from 'apollo-angular';
import { firstValueFrom, Subject } from 'rxjs';
import { BackendService, SecurityService } from './_services.module';

@Injectable({
  providedIn: 'root',
})
export class RolesService implements OnDestroy {
  protected onDestroy$ = new Subject<void>();

  constructor(private securityService: SecurityService, private backend: BackendService) {}

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public async getAddableUserRoles() {
    const userRoles = await this.getUserRoles();
    return getRolesBelowRoles(userRoles).filter((x) => RoleData[x].type.includes(RoleType.User));
  }

  public async getDisabledUserRoles() {
    const userRoles = await this.getUserRoles();
    const disabledRoles = getHighestRoles(userRoles);
    if (!disabledRoles.includes(RoleCode.User)) disabledRoles.push(RoleCode.User);
    return disabledRoles;
  }

  public async getUserRoles() {
    if (!this.securityService.securityContext?.userId) return [];

    const result = await firstValueFrom(
      this.backend.withAuth().query<{
        users: {
          roles: {
            roleCode: RoleCode;
          }[];
        }[];
      }>({
        query: gql`
          query GetUserRoles($filter: UserFilterInput!) {
            users(filter: $filter) {
              roles {
                roleCode
              }
            }
          }
        `,
        variables: {
          filter: <UserFilterInput>{
            id: { eq: this.securityService.securityContext.userId },
          },
        },
        fetchPolicy: 'no-cache',
      }),
    );

    if (result.error || result.data.users.length === 0) return [];

    const roles = result.data.users[0].roles.map((x) => x.roleCode);

    return roles;
  }

  public async getAddableProjectRoles(projectId: string) {
    const [userRoles, projectRoles] = await Promise.all([this.getUserRoles(), this.getProjectRoles(projectId)]);
    const mergedRoles = [...userRoles, ...projectRoles];
    return getRolesBelowRoles(mergedRoles).filter((x) => RoleData[x].type.includes(RoleType.ProjectMember));
  }

  public async getDisabledProjectRoles(projectId: string) {
    const [userRoles, projectRoles] = await Promise.all([this.getUserRoles(), this.getProjectRoles(projectId)]);
    const merged = [...userRoles, ...projectRoles];
    const disabledRoles = getHighestRoles(merged).filter((x) => RoleData[x].type.includes(RoleType.ProjectMember));
    if (!disabledRoles.includes(RoleCode.ProjectMember)) disabledRoles.push(RoleCode.ProjectMember);
    return disabledRoles;
  }

  public async getProjectRoles(projectId: string) {
    if (!this.securityService.securityContext?.userId) return [];

    const result = await firstValueFrom(
      this.backend.withAuth().query<{
        projectMembers: {
          roles: {
            roleCode: RoleCode;
          }[];
        }[];
      }>({
        query: gql`
          query GetProjectRoles($filter: ProjectMemberFilterInput!) {
            projectMembers(filter: $filter) {
              roles {
                roleCode
              }
            }
          }
        `,
        variables: {
          filter: <ProjectMemberFilterInput>{
            userId: { eq: this.securityService.securityContext.userId },
            projectId: { eq: projectId },
          },
        },
        fetchPolicy: 'no-cache',
      }),
    );

    if (result.error || result.data.projectMembers.length == 0) return [];

    const roles = result.data.projectMembers[0].roles.map((x) => x.roleCode);
    return roles;
  }

  public async getAddableEBoardTermRoles() {
    const [userRoles, eboardRoles] = await Promise.all([this.getUserRoles(), this.getEBoardTermRoles()]);
    const mergedRoles = [...userRoles, ...eboardRoles];
    return getRolesBelowRoles(mergedRoles).filter((x) => RoleData[x].type.includes(RoleType.EBoard));
  }

  public async getDisabledEBoardTermRoles() {
    const [userRoles, eboardRoles] = await Promise.all([this.getUserRoles(), this.getEBoardTermRoles()]);
    const merged = [...userRoles, ...eboardRoles];
    const disabledRoles = getHighestRoles(merged).filter((x) => RoleData[x].type.includes(RoleType.EBoard));
    if (!disabledRoles.includes(RoleCode.Eboard)) disabledRoles.push(RoleCode.Eboard);
    return disabledRoles;
  }

  public async getEBoardTermRoles() {
    const result = await firstValueFrom(
      this.backend.withAuth().query<{
        users: {
          eBoard: {
            terms: {
              roles: {
                roleCode: RoleCode;
              }[];
            }[];
          };
        }[];
      }>({
        query: gql`
          query GetUserEBoardTermRoles($filter: UserFilterInput!) {
            users(filter: $filter) {
              eBoard {
                terms {
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
            id: { eq: this.securityService.securityContext?.userId },
          },
        },
        fetchPolicy: 'no-cache',
      }),
    );

    if (result.error || result.data.users.length === 0 || !result.data.users[0].eBoard) return [];

    let roles: RoleCode[] = [];
    for (const term of result.data.users[0].eBoard.terms)
      roles = roles.concat(term.roles.map((x) => x.roleCode as RoleCode));
    return roles;
  }
}
