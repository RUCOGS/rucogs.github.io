import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { map } from 'rxjs/operators';
import { User } from '@app/utils/user';
import { Router } from '@angular/router';

const AUTH_BASE_URL = "http://localhost:8080"
const AUTH_API_URL = AUTH_BASE_URL + "/auth/";
const OAUTH_API_URL = AUTH_BASE_URL + "/auth/thirdparty/";

const AUTH_TOKEN_KEY = 'auth-token';
const REFRESH_TOKEN_KEY = 'refresh-token';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

export interface AuthPayload {
  user: User,
  accessToken: string,
  refreshToken: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenSubject: BehaviorSubject<string>;
  public token$: Observable<string>;

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    let token = localStorage.getItem(AUTH_TOKEN_KEY);
    this.token$ = new Observable();
    if (!token) {
      token = "";
    }
    this.tokenSubject = new BehaviorSubject<string>(token);
    this.token$ = this.tokenSubject.asObservable();
  }

  public logout() {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);

    this.router.navigateByUrl('/login');
  }

  public setToken(token: string, refreshToken: string): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);

    localStorage.setItem(AUTH_TOKEN_KEY, token);
    localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);

    this.tokenSubject.next(token);
  }
  
  public getToken(): string {
    return localStorage.getItem(AUTH_TOKEN_KEY) ?? "";
  }

  public socialLogin(social): Observable<AuthPayload> {
    let authUrl: string = OAUTH_API_URL + social;
    const observable = new Observable<AuthPayload>((observer) => {
      const popup = window.open(authUrl, 'myWindow', 'location=1,status=1,scrollbars=1,width=800,height=800');
      let listener = window.addEventListener('message', (message) => {
        if (message.origin === AUTH_BASE_URL) {
          observer.next(message.data);
        }
      });
    });
    const that = this;
    observable.subscribe({
      next(data: AuthPayload) {
        that.setToken(data.accessToken, data.refreshToken);
      }
    })
    return observable;
  }
  
  public login(username: string, password: string): Observable<AuthPayload> {
    const observable = this.http.post<AuthPayload>(AUTH_API_URL + 'signin', {
      username,
      password
    }, httpOptions);
    const that = this;
    observable.subscribe({ 
      next(data: AuthPayload) {
        that.setToken(data.accessToken, data.refreshToken);
      } 
    });
    return observable;
  }

  public signup(username: string, email: string, password: string): Observable<AuthPayload> {
    const observable = this.http.post<AuthPayload>(AUTH_API_URL + 'signup', {
      username,
      email,
      password
    }, httpOptions);
    const that = this;
    observable.subscribe({ 
      next(data: AuthPayload) {
        that.setToken(data.accessToken, data.refreshToken);
      } 
    });
    return observable;
  }
}