import { Injectable, OnDestroy } from '@angular/core';
import { EBoardFilterInput, ProjectMemberFilterInput, RoleCode, UserFilterInput } from '@src/generated/graphql-endpoint.types';
import { getHighestRoles, getRolesBelow, getRolesBelowOrEqualRoles, getRolesBelowRoles, RoleData, RoleType } from '@src/shared/security';
import { gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { arrayWithoutDuplicates, mergeArraysWithoutDuplicates } from '@app/utils/_utils.module';
import { BackendService, SecurityService } from './_services.module';
import { Xliff } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class RolesService implements OnDestroy {

  private onDestroy$ = new Subject<void>();
  
  constructor(
    private securityService: SecurityService,
    private backend: BackendService
  ) {}

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  public async getAddableUserRoles() {
    const userRoles = await this.getUserRoles();
    return getRolesBelowRoles(userRoles).filter(x => RoleData[x].type.includes(RoleType.User));
  }

  public async getDisabledUserRoles() {
    const userRoles = await this.getUserRoles();
    const highestUserRoles = getHighestRoles(userRoles);
    return highestUserRoles;
  }

  public async getUserRoles() {
    if (!this.securityService.securityContext?.userId)
      return [];
    
    const result = await this.backend.withAuth().query<{
      users: {
        roles: {
          roleCode: RoleCode
        }[]
      }[]
    }>({
      query: gql`
        query($filter: UserFilterInput) {
          users(filter: $filter) {
            roles {
              roleCode
            }
          }
        }
      `,
      variables: {
        filter: {
          id: { eq: this.securityService.securityContext.userId }
        }
      },
      fetchPolicy: 'no-cache'
    })
    .pipe(first())
    .toPromise();

    if (result.error || result.data.users.length === 0)
      return [];
    
    const roles = result.data.users[0].roles.map(x => x.roleCode);

    return roles;
  }

  public async getAddableProjectRoles(projectId: string) {
    const [userRoles, projectRoles] = await Promise.all([
      this.getUserRoles(), 
      this.getProjectRoles(projectId)]
    );
    const mergedRoles = [...userRoles, ...projectRoles];
    return getRolesBelowRoles(mergedRoles).filter(x => RoleData[x].type.includes(RoleType.ProjectMember));
  }

  public async getDisabledProjectRoles(projectId: string) {
    const [userRoles, projectRoles] = await Promise.all([this.getUserRoles(), this.getProjectRoles(projectId)]);
    const merged = [...userRoles, ...projectRoles];
    return getHighestRoles(merged).filter(x => RoleData[x].type.includes(RoleType.ProjectMember));
  }

  public async getProjectRoles(projectId: string) {
    if (!this.securityService.securityContext?.userId)
      return [];
    
    const addableUserRoles = await this.getAddableUserRoles();

    const result = await this.backend.withAuth().query<{
      projectMembers: {
        roles: {
          roleCode: RoleCode
        }[]
      }[]
    }>({
      query: gql`
        query($filter: ProjectMemberFilterInput) {
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
          projectId: { eq: projectId }
        }
      },
      fetchPolicy: 'no-cache'
    })
    .pipe(first())
    .toPromise();

    if (result.error || result.data.projectMembers.length == 0)
      return [];
    
    const roles = result.data.projectMembers[0].roles.map(x => x.roleCode);
    return roles;
  }
  
  public async getAddableEBoardRoles(eboardId: string) {
    const [userRoles, eboardRoles] = await Promise.all([
      this.getUserRoles(), 
      this.getEBoardRoles(eboardId)]
    );
    const mergedRoles = [...userRoles, ...eboardRoles];
    return getRolesBelowRoles(mergedRoles).filter(x => RoleData[x].type.includes(RoleType.EBoard));
  }

  public async getDisabledEBoardRoles(projectId: string) {
    const [userRoles, eboardRoles] = await Promise.all([this.getUserRoles(), this.getEBoardRoles(projectId)]);
    const merged = [...userRoles, ...eboardRoles];
    return getHighestRoles(merged).filter(x => RoleData[x].type.includes(RoleType.EBoard));
  }

  public async getEBoardRoles(eboardId: string) {
    const result = await this.backend.withAuth().query<{
      eBoards: {
        roles: {
          roleCode: RoleCode
        }[]
      }[]
    }>({
      query: gql`
        query($filter: ProjectMemberFilterInput) {
          eBoards(filter: $filter) {
            roles {
              roleCode
            }
          }
        }
      `,
      variables: {
        filter: <EBoardFilterInput>{
          id: { eq: eboardId }
        }
      },
      fetchPolicy: 'no-cache'
    })
    .pipe(first())
    .toPromise();

    if (result.error || result.data.eBoards.length === 0)
      return [];
    
    const roles = result.data.eBoards[0].roles.map(x => x.roleCode);
    return roles;
  }
}
