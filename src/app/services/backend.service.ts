import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { ApolloQueryResult, FetchResult, InMemoryCache, QueryOptions, split, SubscriptionOptions, WatchQueryOptions } from '@apollo/client/core';
import { EntityManagerMetadata, OperationSecurityDomain } from '@src/shared/security';
import { SettingsService } from '@src/_settings';
import { Apollo, QueryRef } from 'apollo-angular';
import { EmptyObject, ExtraSubscriptionOptions, MutationOptions, MutationResult } from 'apollo-angular/types';
import { createUploadLink } from 'apollo-upload-client';
import { Observable, Subject } from 'rxjs';
import { AuthService } from './auth.service';
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient, Client as GraphQLWsClient } from "graphql-ws";
import { getMainDefinition } from '@apollo/client/utilities';
import { takeUntil } from 'rxjs/operators';

type HttpClientOptions = {
  headers?: HttpHeaders | {
    [header: string]: string | string[];
  };
  context?: HttpContext;
  observe?: 'body';
  params?: HttpParams | {
      [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
  };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService implements OnDestroy {

  private opSettings: {
    useAuth: boolean;
    operationDomain: OperationSecurityDomain | undefined;
  } = this.defaultOpSettings();

  protected onDestroy$ = new Subject<void>();
  private graphQLWsClient!: GraphQLWsClient;

  constructor(
    private apollo: Apollo, 
    private authService: AuthService,
    private http: HttpClient,
    private settings: SettingsService,
  ) {
    this.rebuildClient();
    this.authService.payload$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (value) => {
          this.rebuildClient();
        }
      })
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private resetOpSettings() {
    this.opSettings = this.defaultOpSettings();
  }

  public rebuildClient() {
    if (this.apollo.default().client) {
      this.apollo.default().client.stop();
      this.apollo.default().client.clearStore();
      this.apollo.removeClient("default");
    }
    this.apollo.createDefault(this.configureApolloClientOptions(this.authService.getToken()));
  }

  private defaultOpSettings() {
    return {
      useAuth: false,
      operationDomain: undefined
    };
  }

  private getHeaders() {
    return {
      "Authorization": "Bearer " + this.authService.getToken(),
      ...(this.opSettings.operationDomain && {
        "Operation-Metadata": JSON.stringify(<EntityManagerMetadata>{
          securityDomain: this.opSettings.operationDomain
        })
      })
    };
  }

  private configureApolloOperationOptions(options: any) {
    return {
      ...options,
      ...(this.opSettings.useAuth && {
        context: {
          ...options.context,
          headers: {
            ...this.getHeaders(),
            ...options.context?.headers
          }
        }
      })
    };
  }

  private configureApolloClientOptions(authToken: string = "") {
    const baseGraphQLUri = this.settings.Backend.backendDomain + this.settings.Backend.graphQLRelativePath;

    const uploadLink = createUploadLink({ 
      uri: `http://${baseGraphQLUri}`,
      headers: { 'Apollo-Require-Preflight': 'true' }
    });

    if (this.graphQLWsClient)
      this.graphQLWsClient.dispose();
    this.graphQLWsClient = createClient({
      url: `ws://${baseGraphQLUri}`,
      connectionParams: {
        authentication: `Bearer ${authToken}`
      }
    });
    
    const webSocketLink = new GraphQLWsLink(
      this.graphQLWsClient
    );

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const splitLink = split(
      // split based on operation type
      ({query}) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' && definition.operation === 'subscription'
        );
      },
      webSocketLink,
      uploadLink,
    );

    return {
      link: splitLink,
      cache: new InMemoryCache(),
    };
  }

  private configureHttpOptions(options: HttpClientOptions | undefined) {
    if (!options)
      options = {};
    const result = <HttpClientOptions>{
      ...options,
      ...(this.opSettings.useAuth && { 
        headers: {
          ...this.getHeaders(),
          ...options.headers
        }
      })
    };
    return result;
  }

  private configureUrl(url: string) {
    if (url.startsWith('/'))
      return this.settings.Backend.backendHttpsURL + url;
    return url;
  }

  // #region // ----- SETTINGS ----- //
  withOpDomain(operationDomain: OperationSecurityDomain | undefined) {
    this.opSettings.operationDomain = operationDomain;
    return this;
  }

  withAuth() {
    if (this.authService.authenticated)
      this.opSettings.useAuth = true;
    return this;
  }
  // #endregion // -- SETTINGS ----- //

  // #region // ----- GRAPHQL ----- //
  watchQuery<TData, TVariables = EmptyObject>(options: WatchQueryOptions<TVariables, TData>): QueryRef<TData, TVariables> {
    const result = this.apollo.default().watchQuery<TData, TVariables>(this.configureApolloOperationOptions(options));
    this.resetOpSettings();
    return result;
  }

  query<T, V = EmptyObject>(options: QueryOptions<V, T>): Observable<ApolloQueryResult<T>> {
    const result = this.apollo.default().query<T, V>(this.configureApolloOperationOptions(options));
    this.resetOpSettings();
    return result;
  }
  
  mutate<T, V = EmptyObject>(options: MutationOptions<T, V>): Observable<MutationResult<T>> {
    const result = this.apollo.default().mutate<T, V>(this.configureApolloOperationOptions(options));
    this.resetOpSettings();
    return result;
  }

  subscribe<T, V = EmptyObject>(options: SubscriptionOptions<V, T>, extra?: ExtraSubscriptionOptions): Observable<FetchResult<T>> {
    const result = this.apollo.default().subscribe<T, V>(this.configureApolloOperationOptions(options));
    this.resetOpSettings();
    return result;
  }
  // #endregion // -- SETTINGS ----- //

  // #region // ----- REST ----- //
  get<T>(url: string, body: any | null, options?: HttpClientOptions): Observable<T> {
    const result = this.http.get<T>(this.configureUrl(url), this.configureHttpOptions(options));
    return result;
  }
  
  head<T>(url: string, body: any | null, options?: HttpClientOptions): Observable<T> {
    const result = this.http.head<T>(this.configureUrl(url), this.configureHttpOptions(options));
    return result;
  }

  post<T>(url: string, body: any | null, options?: HttpClientOptions): Observable<T> {
    const result = this.http.post<T>(this.configureUrl(url), body, this.configureHttpOptions(options));
    return result;
  }

  put<T>(url: string, body: any | null, options?: HttpClientOptions): Observable<T> {
    const result = this.http.put<T>(this.configureUrl(url), body, this.configureHttpOptions(options));
    return result;
  }
  
  delete<T>(url: string, options?: HttpClientOptions): Observable<T> {
    const result = this.http.delete<T>(this.configureUrl(url), this.configureHttpOptions(options));
    return result;
  }

  patch<T>(url: string, body: any | null, options?: HttpClientOptions): Observable<T> {
    const result = this.http.patch<T>(this.configureUrl(url), body, this.configureHttpOptions(options));
    return result;
  }

  request<T>(method: string, url: string, options?: HttpClientOptions): Observable<T> {
    const result = this.http.request<T>(method, url, this.configureHttpOptions(options));
    return result;
  }
  // #endregion // -- REST ----- //
}
