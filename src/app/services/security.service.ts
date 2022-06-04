import { Injectable, OnDestroy } from '@angular/core';
import { OperationSecurityDomain, SecurityDomain, SecurityPolicy, SecurityContext, PermissionsCalculator, isSecurityDomainValidForOpDomain } from '@src/shared/security';
import { Apollo, gql } from 'apollo-angular';
import { Subject, Subscription } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { BackendService } from './backend.service';

@Injectable({
  providedIn: 'root'
})
export class SecurityService implements OnDestroy {
  public securityPolicy: SecurityPolicy | undefined;
  public securityContext: SecurityContext | undefined;

  private onDestroy$ = new Subject<void>();
  
  constructor(
    private backend: BackendService,
    private authService: AuthService,
  ) { 
    this.fetchData();
  }
  
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  private fetchData() {
    this.backend.withAuth().query<{
      securityContext: SecurityContext
      securityPolicy: SecurityPolicy
    }>({
      query: gql`
        query {
          securityContext
          securityPolicy
        }
      `
    })
    .pipe(first(), takeUntil(this.onDestroy$))
    .subscribe(({data}) => {
      this.securityContext = data.securityContext;
      this.securityPolicy = data.securityPolicy;
    });
  }

  public makePermCalc() {
    return new PermissionsCalculator(this.securityContext);
  }
}
