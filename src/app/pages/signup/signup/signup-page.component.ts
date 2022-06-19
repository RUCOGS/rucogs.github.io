import { Component, OnDestroy, OnInit } from '@angular/core';
import { Form, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@app/services/auth.service';
import { TokenStorageService } from '@app/services/token-storage.service';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnDestroy {

  form: UntypedFormGroup;
  hide: boolean = true;
  errorMessage: string = "";
  isSignupFailed: boolean = false;

  protected onDestroy$ = new Subject<void>();

  constructor(
    formBuilder: UntypedFormBuilder, 
    private tokenStorage: TokenStorageService, 
    private authService: AuthService, 
    private router: Router) {
    this.form = formBuilder.group({
      username: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  socialSignup(social: string) {
    this.performSignup(this.authService.socialLogin(social));
  }

  private performSignup(observable: Observable<any>) {
    observable.pipe(first(), takeUntil(this.onDestroy$)).subscribe({
      next: data => { 
        this.isSignupFailed = false;
        this.router.navigateByUrl('/user/' + data.user.username);
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isSignupFailed = true;
      }
    });
  }

  onSignupSubmit(): void {
    const data = this.form.value;
    this.performSignup(this.authService.signup(data.username, data.email, data.password));
  }
  
}
