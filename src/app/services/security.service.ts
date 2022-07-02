import { Injectable, OnDestroy } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { Permission } from '@src/generated/graphql-endpoint.types';
import {
  isBaseSecurityDomain,
  isExtendedSecurityDomain,
  OperationSecurityDomain,
  PermissionsCalculator,
  SecurityContext,
  SecurityDomain,
  SecurityDomainTemplate,
  SecurityPolicy,
} from '@src/shared/security';
import { gql } from 'apollo-angular';
import { first, firstValueFrom, Observable, Subject, takeUntil } from 'rxjs';
import { AuthService } from './auth.service';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root',
})
export class SecurityService implements OnDestroy {
  public securityPolicy: SecurityPolicy | undefined;
  public securityContext: SecurityContext | undefined;

  private fetchQuery?: Observable<
    ApolloQueryResult<{
      securityContext: SecurityContext;
      securityPolicy: SecurityPolicy;
    }>
  >;
  protected onDestroy$ = new Subject<void>();

  constructor(private backend: BackendService, private authService: AuthService) {
    this.fetchData();
    authService.payload$.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (value) => {
        if (value) this.fetchData();
      },
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  async fetchData() {
    this.fetchQuery = this.backend
      .withAuth()
      .query<{
        securityContext: SecurityContext;
        securityPolicy: SecurityPolicy;
      }>({
        query: gql`
          query {
            securityContext
            securityPolicy
          }
        `,
        fetchPolicy: 'no-cache',
      })
      .pipe(first(), takeUntil(this.onDestroy$));

    const result = await firstValueFrom(this.fetchQuery);
    if (result.error) return;

    this.securityContext = result.data.securityContext;
    this.securityPolicy = result.data.securityPolicy;

    this.fetchQuery = undefined;
  }

  public async waitUntilReady() {
    if (this.fetchQuery) await this.fetchQuery.toPromise();
  }

  public makePermCalc() {
    return new PermissionsCalculator(this.securityContext);
  }

  public get permissions() {
    return this.securityContext?.permissions;
  }

  public hasCompletePermission(permissionCode: Permission) {
    const permissionsDomain = this.securityContext?.permissions[permissionCode];
    if (isBaseSecurityDomain(permissionsDomain)) {
      return permissionsDomain === true;
    } else if (isExtendedSecurityDomain(permissionsDomain)) {
      return permissionsDomain.baseDomain === true;
    }
    // Return false by default. We can't tell if a custom domain has
    // complete permissions or not, so we don't bother parsing it.
    return false;
  }

  private getOpDomainsFromPermissionHelper(permissionDomain: SecurityDomain): OperationSecurityDomain[] {
    if (isBaseSecurityDomain(permissionDomain)) {
      if (permissionDomain === true) {
        // There's no point in filtering for an entity using the operation domain here.
        // If permission == true, then we should be able to access every entity, hence the
        // operation domain is irrelevant.
        return [];
      }
      return permissionDomain as OperationSecurityDomain[];
    } else if (isExtendedSecurityDomain(permissionDomain)) {
      // Only process the base domain
      return this.getOpDomainsFromPermissionHelper(permissionDomain.baseDomain);
    } else {
      // Do nothing for custom domains
      return [];
    }
  }

  public getOpDomainsFromPermission(permissionCode: Permission): OperationSecurityDomain[] | undefined {
    // Unset the operation domain if we have complete access
    if (this.hasCompletePermission(permissionCode)) return undefined;
    try {
      let domains: OperationSecurityDomain[] = this.getOpDomainsFromPermissionHelper(permissionCode);
      return domains;
    } catch (err) {
      if (err instanceof Error) err.message += ` Permission: "${permissionCode}".`;
      throw err;
    }
  }
}

export type OpDomainFieldOptions = {
  [key in keyof SecurityDomainTemplate]?: true;
};
