import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth.service';
import { TokenStorageService } from '@app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide: boolean = true;

  constructor(private formBuilder: FormBuilder, private tokenStorage: TokenStorageService) {
    this.form = formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  socialLogin(social: string) {
    const AUTH_URL_BASE = "http://localhost:8080"
    let authUrl: string = AUTH_URL_BASE
    switch(social) {
      case 'discord':
        authUrl += '/auth/discord';
        break;
      case 'google':
        authUrl += '/auth/google';
        break;
    }
    const popup = window.open(authUrl, 'myWindow', 'location=1,status=1,scrollbars=1,width=800,height=800');
    let listener = window.addEventListener('message', (message) => {
      if (message.origin === AUTH_URL_BASE) {
        console.log('Recieved JWT: ' + message.data.accessToken);
        this.tokenStorage.saveToken(message.data.accessToken);
      }
    });
  }

  onSubmit(): void {
    // TODO
  }
}
