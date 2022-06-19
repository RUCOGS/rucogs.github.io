import { Injectable, OnDestroy } from '@angular/core';
import { ApolloQueryResult, Operation } from '@apollo/client/core';
import { Permission } from '@src/generated/graphql-endpoint.types';
import { BaseSecurityDomain, isBaseSecurityDomain, isExtendedSecurityDomain, OperationSecurityDomain, PermissionsCalculator, SecurityContext, SecurityDomain, SecurityDomainTemplate, SecurityPolicy } from '@src/shared/security';
import { gql } from 'apollo-angular';
import { firstValueFrom, Observable, Subject, first, takeUntil } from 'rxjs';
import { AuthService } from './auth.service';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService implements OnDestroy {
  public securityPolicy: SecurityPolicy | undefined;
  public securityContext: SecurityContext | undefined;
  
  private fetchQuery?: Observable<ApolloQueryResult<{
    securityContext: SecurityContext
    securityPolicy: SecurityPolicy
  }>>;
  protected onDestroy$ = new Subject<void>();
  
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
    this.onDestroy$.complete();
  }

  async fetchData() {
    this.fetchQuery = this.backend.withAuth().query<{
      securityContext: SecurityContext
      securityPolicy: SecurityPolicy
    }>({
      query: gql`
        query {
          securityContext
          securityPolicy
        }
      `,
      fetchPolicy: 'no-cache'
    })
    .pipe(first(), takeUntil(this.onDestroy$));

    const result = await firstValueFrom(this.fetchQuery);
    if (result.error)
      return;

    this.securityContext = result.data.securityContext
    this.securityPolicy = result.data.securityPolicy;

    this.fetchQuery = undefined;
  }

  public async waitUntilReady() {
    if (this.fetchQuery)
      await this.fetchQuery.toPromise();
  }

  public makePermCalc() {
    return new PermissionsCalculator(this.securityContext);
  }

  public get permissions() {
    return this.securityContext?.permissions;
  }

  public getOpDomainFieldFromPermissionDomain<T extends keyof SecurityDomainTemplate>(permissionDomain: SecurityDomain, field: T): SecurityDomainTemplate[T][] {
    if (isBaseSecurityDomain(permissionDomain)) {
      if (permissionDomain === true) {
        // There's no point in filtering for an entity using the operation domain here.
        // If permission == true, then we should be able to access every entity, hence the 
        // operation domain is irrelevant.
        return [];
      }
      if (permissionDomain.some(x => x[field] === undefined))
        throw new Error(`Field "${field}" doesn't exist on domain.`);
      return permissionDomain.map(x => x[field]) as SecurityDomainTemplate[T][];
    } else if (isExtendedSecurityDomain(permissionDomain)) {
      // Only process the base domain
      return this.getOpDomainFieldFromPermissionDomain(permissionDomain.baseDomain, field);
    } else {
      // Do nothing for custom domains
      return [];
    }
  }

  public getOpDomainFromPermission<T extends keyof SecurityDomainTemplate>(permissionCode: Permission, fields: (keyof SecurityDomainTemplate)[]): OperationSecurityDomain {
    let domain: OperationSecurityDomain = {};
    for (const field of fields) {
      domain[field] = this.getOpDomainFieldFromPermission(permissionCode, field);
    }
    return domain;
  }

  public getOpDomainFieldFromPermission<T extends keyof SecurityDomainTemplate>(permissionCode: Permission, field: keyof SecurityDomainTemplate): SecurityDomainTemplate[T][] {
    const permissionDomain = this.securityContext?.permissions[permissionCode];
    try {
      return this.getOpDomainFieldFromPermissionDomain(permissionDomain, field);
    } catch(err) {
      if (err instanceof Error) {
        err.message += ` Permission: "${permissionCode}".`;
        throw err;
      }
    }
    return [];
  }
}
