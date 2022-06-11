import { Injectable, OnDestroy } from '@angular/core';
import { ApolloQueryResult } from '@apollo/client/core';
import { PermissionsCalculator, SecurityContext, SecurityPolicy } from '@src/shared/security';
import { gql } from 'apollo-angular';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';
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
  private onDestroy$ = new Subject();
  
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

    const result = await this.fetchQuery.toPromise();

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
}
