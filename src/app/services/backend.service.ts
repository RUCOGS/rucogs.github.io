import { HttpClient, HttpContext, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApolloQueryResult, FetchResult, QueryOptions, SubscriptionOptions, WatchQueryOptions } from '@apollo/client/core';
import { EntityManagerMetadata, OperationSecurityDomain } from '@src/shared/security';
import { SettingsService } from '@src/_settings';
import { Apollo, QueryRef } from 'apollo-angular';
import { EmptyObject, ExtraSubscriptionOptions, MutationOptions, MutationResult } from 'apollo-angular/types';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

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
export class BackendService {

  private opSettings: {
    useAuth: boolean;
    operationDomain: OperationSecurityDomain | undefined;
  } = this.defaultSettings();

  constructor(
    private apollo: Apollo, 
    private authService: AuthService,
    private http: HttpClient,
    private settings: SettingsService,
  ) {}

  private reset() {
    this.opSettings = this.defaultSettings();
  }

  private defaultSettings() {
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

  private configureApolloOptions(options: any) {
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
      return this.settings.Backend.backendApiLink + url;
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
    const result = this.apollo.watchQuery<TData, TVariables>(this.configureApolloOptions(options));
    this.reset();
    return result;
  }

  query<T, V = EmptyObject>(options: QueryOptions<V, T>): Observable<ApolloQueryResult<T>> {
    const result = this.apollo.query<T, V>(this.configureApolloOptions(options));
    this.reset();
    return result;
  }
  
  mutate<T, V = EmptyObject>(options: MutationOptions<T, V>): Observable<MutationResult<T>> {
    const result = this.apollo.mutate<T, V>(this.configureApolloOptions(options));
    this.reset();
    return result;
  }

  subscribe<T, V = EmptyObject>(options: SubscriptionOptions<V, T>, extra?: ExtraSubscriptionOptions): Observable<FetchResult<T>> {
    const result = this.apollo.subscribe<T, V>(this.configureApolloOptions(options));
    this.reset();
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
