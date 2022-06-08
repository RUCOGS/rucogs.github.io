import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { User } from '@src/generated/graphql-endpoint.types';
import { Router } from '@angular/router';
import { SettingsService } from '@src/_settings';
import { takeUntil } from 'rxjs/operators';

const AUTH_PAYLOAD_KEY = 'auth-payload';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface AuthPayload {
  user: User,
  accessToken: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService implements OnDestroy {
  public payload$: Observable<AuthPayload | undefined>;
  public get authenticated() {
    return this.getPayload() !== null;
  }

  private payloadSubject: BehaviorSubject<AuthPayload | undefined>;
  private get authLink() {
    return this.settings.Backend.backendApiLink + "/auth/";
  }
  private get oAuthLink() {
    return this.settings.Backend.backendApiLink + "/auth/thirdparty/";
  }

  private onDestroy$ = new Subject<boolean>();

  constructor(
    private router: Router,
    private http: HttpClient,
    private settings: SettingsService
  ) {
    const serializedPayload = localStorage.getItem(AUTH_PAYLOAD_KEY);
    let payload = serializedPayload ? JSON.parse(serializedPayload) as AuthPayload : undefined;
    this.payload$ = new Observable();
    this.payloadSubject = new BehaviorSubject<AuthPayload | undefined>(payload);
    this.payload$ = this.payloadSubject.asObservable();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  public logout() {
    this.setPayload(undefined);

    this.router.navigateByUrl('/login');
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
    return storedPayload ? JSON.parse(storedPayload) as AuthPayload : null;
  }

  public getToken(): string {
    return this.getPayload()?.accessToken ?? "";
  }

  public socialLogin(social): Observable<AuthPayload> {
    let authUrl: string = this.oAuthLink + social;
    const socialLogin$ = new Observable<AuthPayload>((observer) => {
      const popup = window.open(authUrl, 'myWindow', 'location=1,status=1,scrollbars=1,width=800,height=800');
      let listener = window.addEventListener('message', (message) => {
        if (message.origin === this.settings.Backend.backendApiLink) {
          observer.next(message.data);
        }
      });
    });
    socialLogin$.pipe(takeUntil(this.onDestroy$)).subscribe({
      next: (data: AuthPayload) => {
        console.log("got payload");
        this.setPayload(data);
      }
    });
    return socialLogin$;
  }
  
  public login(username: string, password: string): Observable<AuthPayload> {
    const login$ = this.http.post<AuthPayload>(this.authLink + 'signin', {
      username,
      password
    }, httpOptions);
    login$.pipe(takeUntil(this.onDestroy$)).subscribe({ 
      next: (data: AuthPayload) => {
        this.setPayload(data);
      } 
    });
    return login$;
  }

  public signup(username: string, email: string, password: string): Observable<AuthPayload> {
    const signup$ = this.http.post<AuthPayload>(this.authLink + 'signup', {
      username,
      email,
      password
    }, httpOptions);
    signup$.pipe(takeUntil(this.onDestroy$)).subscribe({ 
      next: (data: AuthPayload) => {
        this.setPayload(data);
      } 
    });
    return signup$;
  }
}