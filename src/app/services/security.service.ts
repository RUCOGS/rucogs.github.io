import { Injectable } from '@angular/core';
import { OperationSecurityDomain, SecurityDomain, SecurityPolicy, SecurityContext, PermissionsCalculator, isSecurityDomainValidForOpDomain } from '@src/shared/security';
import { Apollo, gql } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  public securityPolicy: SecurityPolicy | undefined;
  public securityContext: SecurityContext | undefined;

  private querySubscription: Subscription | undefined;
  
  constructor(private backend: BackendService) { 
    this.fetchData();
  }

  private fetchData() {
    this.querySubscription = this.backend.withAuth().watchQuery<{
      securityContext: SecurityContext
      securityPolicy: SecurityPolicy
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
      this.securityPolicy = data.securityPolicy;
    });
  }

  public makePermCalc() {
    return new PermissionsCalculator(this.securityContext);
  }
}
