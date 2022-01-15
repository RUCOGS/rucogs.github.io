import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { fromEvent, Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { map } from 'rxjs/operators';

const AUTH_BASE_URL = "http://localhost:8080"
const AUTH_API_URL = AUTH_BASE_URL + "/auth/";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  socialLogin(social): Observable<any> {
    let authUrl: string = AUTH_API_URL
    switch(social) {
      case 'discord':
        authUrl += 'discord';
        break;
      case 'google':
        authUrl += 'google';
        break;
    }
    return new Observable((observer) => {
      const popup = window.open(authUrl, 'myWindow', 'location=1,status=1,scrollbars=1,width=800,height=800');
      let listener = window.addEventListener('message', (message) => {
        if (message.origin === AUTH_BASE_URL) {
          console.log('Recieved JWT: ' + message.data);
          observer.next(message.data);
        }
      });
    });
  }
  
  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API_URL + 'signin', {
      username,
      password
    }, httpOptions);
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API_URL + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }
}