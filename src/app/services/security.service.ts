import { Injectable, OnDestroy } from '@angular/core';
import { ProjectMemberFilterInput, RoleCode } from '@src/generated/graphql-endpoint.types';
import { getRolesBelowOrEqualRoles, PermissionsCalculator, RoleData, RoleType, SecurityContext, SecurityPolicy } from '@src/shared/security';
import { gql } from 'apollo-angular';
import { Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService implements OnDestroy {
  public securityPolicy: SecurityPolicy | undefined;
  public securityContext: SecurityContext | undefined;
  public roles: RoleCode[] | undefined;

  private onDestroy$ = new Subject<void>();
  
  constructor(
    private backend: BackendService,
    private authService: AuthService,
  ) { 
    this.fetchData();
    authService.payload$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (value) => {
          if (value)
            this.fetchData();
        }
      });
  }
  
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  async fetchData() {
    const result = await this.backend.withAuth().query<{
      securityContext: SecurityContext
      securityPolicy: SecurityPolicy
      users: {
        roles: {
          roleCode: RoleCode
        }[]
      }[]
    }>({
      query: gql`
        query($filter: UserFilterInput) {
          securityContext
          securityPolicy

          users(filter: $filter) {
            roles {
              roleCode
            }
          }
        }
      `,
      variables: {
        filter: {
          id: { eq: this.authService.getPayload()?.user.id }
        }
      },
      fetchPolicy: 'no-cache'
    })
    .pipe(first(), takeUntil(this.onDestroy$))
    .toPromise();

    if (result.error)
      return;

    this.securityContext = result.data.securityContext;
    this.securityPolicy = result.data.securityPolicy;

    this.roles = result.data.users[0].roles.map(x => x.roleCode);
  }

  public makePermCalc() {
    return new PermissionsCalculator(this.securityContext);
  }

  public getAddableRoles() {
    if (!this.roles)
      return [];
    return getRolesBelowOrEqualRoles(this.roles);
  }

  public getAddableRolesOfType(type: RoleType) {
    if (!this.roles)
      return [];
    
    const roles = getRolesBelowOrEqualRoles(this.roles);
    return roles.filter(x => RoleData[x].type.includes(type));
  }

  public async getAddableProjectRoles(projectId: string) {
    if (!this.roles || !this.securityContext)
      return [];

    const result = await this.backend.withAuth().query<{
      securityContext: SecurityContext
      securityPolicy: SecurityPolicy
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
          userId: { eq: this.securityContext.userId },
          projectId: { eq: projectId }
        }
      },
      fetchPolicy: 'no-cache'
    })
    .pipe(first(), takeUntil(this.onDestroy$))
    .toPromise();

    if (result.error)
      return [];
    
    let checkedRoles = this.roles;
    if (result.data.projectMembers.length > 0)
      checkedRoles = checkedRoles.concat(result.data.projectMembers[0].roles.map(x => x.roleCode));
    
    const roles = getRolesBelowOrEqualRoles(checkedRoles);
    return roles.filter(x => RoleData[x].type.includes(RoleType.ProjectMember));
  }
}
