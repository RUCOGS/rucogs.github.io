import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { TokenStorageService } from '@app/services/token-storage.service';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnDestroy {

  form: FormGroup;
  hide: boolean = true;
  errorMessage: string = "";
  isLoginFailed: boolean = false;

  private onDestroy$ = new Subject<void>();

  constructor(
    formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router) {
    this.form = formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  socialLogin(social: string) {
    this.performLogin(this.authService.socialLogin(social));
  }

  private performLogin(observable: Observable<any>) {
    observable.pipe(first(), takeUntil(this.onDestroy$)).subscribe({
      next: data => {
        this.isLoginFailed = false;
        this.router.navigateByUrl('/users/' + data.user.username);
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
