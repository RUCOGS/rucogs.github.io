import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { TokenStorageService } from '@app/services/token-storage.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  hide: boolean = true;
  errorMessage: string = "";
  isLoginFailed: boolean = false;

  constructor(
    formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router) {
    this.form = formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  socialLogin(social: string) {
    this.performLogin(this.authService.socialLogin(social));
  }

  private performLogin(observable: Observable<any>) {
    observable.subscribe({
      next: data => {
        console.log(JSON.stringify(data.user));

        this.isLoginFailed = false;
        this.router.navigateByUrl('/user/' + data.user.username);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  onLoginSubmit(): void {
    const data = this.form.value;
    this.performLogin(this.authService.login(data.username, data.password));
  }
}
