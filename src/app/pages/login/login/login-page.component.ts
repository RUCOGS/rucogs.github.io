import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { TokenStorageService } from '@app/services/token-storage.service';
import { SecurityService } from '@src/app/services/security.service';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnDestroy {
  form: UntypedFormGroup;
  hide: boolean = true;
  errorMessage: string = '';
  isLoginFailed: boolean = false;

  protected onDestroy$ = new Subject<void>();

  constructor(
    formBuilder: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router,
    private securityService: SecurityService,
  ) {
    this.form = formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  socialLogin(social: string) {
    this.performLogin(this.authService.socialLogin(social));
  }

  private performLogin(observable: Observable<any>) {
    observable.pipe(first(), takeUntil(this.onDestroy$)).subscribe({
      next: async (data) => {
        if (data) {
          this.isLoginFailed = false;
          await this.securityService.waitUntilReady();
          this.router.navigateByUrl(`/members/${data.user.username}`);
        }
      },
      error: (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      },
    });
  }

  onLoginSubmit(): void {
    const data = this.form.value;
    this.performLogin(this.authService.login(data.username, data.password));
  }
}
