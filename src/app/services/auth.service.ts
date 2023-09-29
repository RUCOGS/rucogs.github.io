import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { InMemoryCache } from '@apollo/client/core';
import { User } from '@src/generated/graphql-endpoint.types';
import { EntityManagerMetadata, SecurityContext } from '@src/shared/security';
import { SettingsService } from '@src/_settings';
import { Apollo, gql } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { BehaviorSubject, firstValueFrom, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

const AUTH_PAYLOAD_KEY = 'auth-payload';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

export interface AuthPayload {
  user: Partial<User>;
  accessToken: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  public onDestroy$ = new Subject<void>();
  public payload$: Observable<AuthPayload | undefined>;
  public get authenticated() {
    return this.getPayload() !== null;
  }

  private payloadSubject: BehaviorSubject<AuthPayload | undefined>;
  private get authLink() {
    return this.settings.Backend.backendHttpsURL + '/auth/';
  }
  private get oAuthLink() {
    return this.settings.Backend.backendHttpsURL + '/auth/thirdparty/';
  }

  constructor(
    private apollo: Apollo,
    private router: Router,
    private http: HttpClient,
    httpLink: HttpLink,
    private settings: SettingsService,
  ) {
    // Create a dedicated client for the auth service. This is needed because we cannot use
    // the backend service, else we create a cyclical dependency.
    this.apollo.createNamed('auth', {
      link: httpLink.create({
        uri: this.settings.Backend.graphQLHttpsURL,
      }),
      cache: new InMemoryCache(),
    });
    const serializedPayload = localStorage.getItem(AUTH_PAYLOAD_KEY);
    let payload = serializedPayload ? (JSON.parse(serializedPayload) as AuthPayload) : undefined;
    this.payloadSubject = new BehaviorSubject<AuthPayload | undefined>(payload);
    this.payload$ = this.payloadSubject.asObservable();

    this.validateAuth();
  }

  async validateAuth() {
    if (!this.authenticated) return;

    // Validate current auth
    // TODO LATER: Write a dedicated endpoint for verifying. Sending over entire
    // security context is overkill.
    const result = await firstValueFrom(
      this.apollo.use('auth').query<{
        securityContext: SecurityContext;
      }>({
        query: gql`
          query {
            securityContext
          }
        `,
        fetchPolicy: 'no-cache',
        context: {
          headers: {
            Authorization: 'Bearer ' + this.getToken(),
          },
        },
      }),
    );

    if (!result.data.securityContext.userId) {
      // We have fallen to default security context, meaning our current auth is invalid
      this.logout();
    }
  }

  async updateUser() {
    const userId = this.getPayload()?.user.id;
    if (!userId) return;

    // We can't use BackendService here because that would
    // cause a cyclical dependency error. Therefore we must
    // manually build the full query from apollo.
    const result = await firstValueFrom(
      this.apollo.use('auth').query<{
        users: {
          id: string;
          email: string;
          username: string;
          displayName: string;
          bio: string;
          avatarLink: string;
          bannerLink: string;
        }[];
      }>({
        query: gql`
          query {
            users {
              id
              email
              username
              displayName
              bio
              avatarLink
              bannerLink
            }
          }
        `,
        fetchPolicy: 'no-cache',
        context: {
          headers: {
            Authorization: 'Bearer ' + this.getToken(),
            'Operation-Metadata': JSON.stringify(<EntityManagerMetadata>{
              securityDomains: [
                {
                  userId: userId,
                },
              ],
            }),
          },
        },
      }),
    );

    if (result.error) return;

    this.setPayload({
      accessToken: this.getToken(),
      user: result.data.users[0],
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public logout() {
    this.setPayload(undefined);
    window.location.reload();
  }

  public setPayload(payload: AuthPayload | undefined): void {
    localStorage.removeItem(AUTH_PAYLOAD_KEY);

    if (payload) {
      localStorage.setItem(AUTH_PAYLOAD_KEY, JSON.stringify(payload));
    }

    this.payloadSubject.next(payload);
  }

  public getPayload(): AuthPayload | null {
    const storedPayload = localStorage.getItem(AUTH_PAYLOAD_KEY);
    return storedPayload ? (JSON.parse(storedPayload) as AuthPayload) : null;
  }

  public getToken(): string {
    return this.getPayload()?.accessToken ?? '';
  }

  public socialLogin(social): Observable<AuthPayload> {
    let authUrl: string = this.oAuthLink + social;
    const socialLogin$ = new Observable<AuthPayload>((observer) => {
      const popup = window.open(authUrl, 'myWindow', 'location=1,status=1,scrollbars=1,width=800,height=900');
      let listener = window.addEventListener('message', (message) => {
        if (message.origin === this.settings.Backend.httpsPrefix + this.settings.Backend.backendDomain) {
          if (message.data.accessToken && message.data.user) {
            observer.next(message.data);
            observer.complete();
          }
        }
      });
    });
    socialLogin$.subscribe({
      next: (data: AuthPayload) => {
        this.setPayload(data);
      },
    });
    return socialLogin$;
  }

  public login(username: string, password: string): Observable<AuthPayload> {
    const login$ = this.http.post<AuthPayload>(
      this.authLink + 'signin',
      {
        username,
        password,
      },
      httpOptions,
    );
    login$.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (data: AuthPayload) => {
        this.setPayload(data);
      },
    });
    return login$;
  }

  public signup(username: string, email: string, password: string): Observable<AuthPayload> {
    const signup$ = this.http.post<AuthPayload>(
      this.authLink + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions,
    );
    signup$.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (data: AuthPayload) => {
        this.setPayload(data);
      },
    });
    return signup$;
  }
}
