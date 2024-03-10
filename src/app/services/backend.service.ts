import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import {
  ApolloQueryResult,
  FetchResult,
  InMemoryCache,
  QueryOptions,
  split,
  SubscriptionOptions,
  WatchQueryOptions,
  Cache,
} from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { getMainDefinition } from '@apollo/client/utilities';
import { EntityManagerMetadata, OperationSecurityDomain } from '@src/shared/security';
import { SettingsService } from '@src/_settings';
import { Apollo, QueryRef } from 'apollo-angular';
import { EmptyObject, ExtraSubscriptionOptions, MutationOptions, MutationResult } from 'apollo-angular/types';
import { createUploadLink } from 'apollo-upload-client';
import { Client as GraphQLWsClient, createClient } from 'graphql-ws';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AuthService } from './auth.service';

type HttpClientOptions = {
  headers?:
    | HttpHeaders
    | {
        [header: string]: string | string[];
      };
  context?: HttpContext;
  observe?: 'body';
  params?:
    | HttpParams
    | {
        [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
      };
  reportProgress?: boolean;
  responseType?: 'json';
  withCredentials?: boolean;
};

type OpSettings = {
  useAuth: boolean;
  operationDomains: OperationSecurityDomain[] | undefined;
};

@Injectable({
  providedIn: 'root',
})
export class BackendService implements OnDestroy {
  public onDestroy$ = new Subject<void>();

  private opSettings: OpSettings = this.defaultOpSettings();
  private graphQLWsClient!: GraphQLWsClient;

  constructor(
    private apollo: Apollo,
    private authService: AuthService,
    private http: HttpClient,
    private settings: SettingsService,
  ) {
    this.rebuildClient();
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
      this.apollo.removeClient('default');
    }
    this.apollo.createDefault(this.configureApolloClientOptions(this.authService.getToken()));
  }

  private defaultOpSettings() {
    return <OpSettings>{
      useAuth: false,
      operationDomains: undefined,
    };
  }

  private getHeaders() {
    return {
      Authorization: 'Bearer ' + this.authService.getToken(),
      ...(this.opSettings.operationDomains && {
        'Operation-Metadata': JSON.stringify(<EntityManagerMetadata>{
          securityDomains: this.opSettings.operationDomains,
        }),
      }),
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
            ...options.context?.headers,
          },
        },
      }),
    };
  }

  private configureApolloClientOptions(authToken: string = '') {
    const baseGraphQLUri = this.settings.Backend.backendDomainPlusBaseUrl + this.settings.Backend.graphQLRelativePath;
    const httpsPrefix = this.settings.Backend.httpsPrefix;
    const wssPrefix = this.settings.Backend.wssPrefix;

    const uploadLink = createUploadLink({
      uri: `${httpsPrefix}${baseGraphQLUri}`,
      headers: { 'Apollo-Require-Preflight': 'true' },
    });

    console.log(`graphql link: ${wssPrefix}${baseGraphQLUri}`);
    if (this.graphQLWsClient) this.graphQLWsClient.dispose();
    this.graphQLWsClient = createClient({
      url: `${wssPrefix}${baseGraphQLUri}`,
      connectionParams: {
        authentication: `Bearer ${authToken}`,
      },
    });

    const webSocketLink = new GraphQLWsLink(this.graphQLWsClient);

    // using the ability to split links, you can send data to each link
    // depending on what kind of operation is being sent
    const splitLink = split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      webSocketLink,
      uploadLink,
    );

    const logoutLink = onError(({ networkError }) => {
      if (networkError) {
        const typettaError: string = (<any>networkError)?.result?.errors[0]?.message ?? '';
        if (typettaError.includes('Token unauthorized')) {
          this.authService.logout();
        }
        console.log('NetworkError: ', networkError);
      }
    });

    return {
      link: logoutLink.concat(splitLink),
      cache: new InMemoryCache(),
    };
  }

  private configureHttpOptions(options: HttpClientOptions | undefined) {
    if (!options) options = {};
    const result = <HttpClientOptions>{
      ...options,
      ...(this.opSettings.useAuth && {
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      }),
    };
    return result;
  }

  private configureUrl(url: string) {
    if (url.startsWith('/')) return this.settings.Backend.backendHttpsURL + url;
    return url;
  }

  async cacheEvict(options: Cache.EvictOptions) {
    this.apollo.client.cache.evict({
      broadcast: true,
      ...options,
    });
  }

  async clearCache() {
    await this.apollo.client.clearStore();
  }

  // #region // ----- SETTINGS ----- //
  withOpDomain(operationDomain: OperationSecurityDomain | undefined) {
    if (operationDomain) this.opSettings.operationDomains = [operationDomain];
    return this;
  }

  withOpDomains(operationDomains: OperationSecurityDomain[] | undefined) {
    this.opSettings.operationDomains = operationDomains;
    return this;
  }

  withAuth() {
    if (this.authService.authenticated) this.opSettings.useAuth = true;
    return this;
  }
  // #endregion // -- SETTINGS ----- //

  // #region // ----- GRAPHQL ----- //
  watchQuery<TData, TVariables = EmptyObject>(
    options: WatchQueryOptions<TVariables, TData>,
  ): QueryRef<TData, TVariables> {
    const result = this.apollo.default().watchQuery<TData, TVariables>(this.configureApolloOperationOptions(options));
    this.resetOpSettings();
    return result;
  }

  query<T, V = EmptyObject>(options: QueryOptions<V, T>): Observable<ApolloQueryResult<T>> {
    let result = this.apollo.default().query<T, V>(this.configureApolloOperationOptions(options));
    this.resetOpSettings();
    return result;
  }

  mutate<T, V = EmptyObject>(options: MutationOptions<T, V>): Observable<MutationResult<T>> {
    let result = this.apollo.default().mutate<T, V>(this.configureApolloOperationOptions(options));
    this.resetOpSettings();
    return result;
  }

  subscribe<T, V = EmptyObject>(
    options: SubscriptionOptions<V, T>,
    extra?: ExtraSubscriptionOptions,
  ): Observable<FetchResult<T>> {
    let result = this.apollo.default().subscribe<T, V>(this.configureApolloOperationOptions(options), extra);
    this.resetOpSettings();
    return result;
  }
  // #endregion // -- GRAPHQL ----- //

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
