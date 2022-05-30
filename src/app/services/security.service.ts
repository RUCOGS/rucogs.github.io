import { Injectable } from '@angular/core';
import { OperationSecurityDomain, SecurityDomain, SecurityPolicies, SecurityContext } from '@src/shared/security.types';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  public securityPolicies: SecurityPolicies | undefined;
  public securityContext: SecurityContext | undefined;

  private querySubscription: Subscription | undefined;
  
  constructor(private backend: BackendService) { 
    this.fetchData();
  }

  private fetchData() {
    this.querySubscription = this.backend.withAuth().watchQuery<{
      securityContext: SecurityContext
      securityPolicies: SecurityPolicies
    }>({
      query: gql`
        query {
          securityContext
          securityPolicies
        }
      `
    })
    .valueChanges.subscribe(({data}) => {
      this.securityContext = data.securityContext;
      this.securityPolicies = data.securityPolicies;
    });
  }

  public isPermissionValidForOpDomain(permission: keyof SecurityContext, operationDomain: OperationSecurityDomain) {
    return this.isPermissionDomainValidForOpDomain(this.securityContext ? this.securityContext[permission] : undefined, operationDomain);
  }

  // Checks if a security permissionmatches the current domain.
  // This method is used to check if a user has a certain permission,
  // given what we want to access.
  public isPermissionDomainValidForOpDomain(permission: true | SecurityDomain[] | undefined, operationDomain: OperationSecurityDomain) {
    if (permission === undefined)
      return false;
    if (permission == true)
      return true;
    const validDomains = permission as SecurityDomain[];
    for (const validDomain of validDomains) {
      let matchedAllDomainProps = true;
      for (const key in operationDomain) {
        if (validDomain.hasOwnProperty(key)) {
          // OperationSecurityDomain format:
          // const operationDomain = {
          //   userId: ["dsfdsf2023f8j3f", /*OR*/ "w023f920sdfdsf", /*OR*/ "fj230f89fjfef" ],
          //   /*AND*/
          //   roleCode: ["USER", /*OR*/ "MODERATOR", /*OR*/ "SUPER_ADMIN" ],
          //   /*AND*/
          //   roleCode: ["USER", /*OR*/ "MODERATOR", /*OR*/ "SUPER_ADMIN" ],
          // }
          // If we didn't get a match inside this array
          if (!((<any>operationDomain)[key].some((x: any) => x === (<any>validDomain)[key]))) {
            matchedAllDomainProps = false;
            break;
          }
        }
      }
      if (matchedAllDomainProps) {
        return true;
      }
    }
    return false;
  }
}
