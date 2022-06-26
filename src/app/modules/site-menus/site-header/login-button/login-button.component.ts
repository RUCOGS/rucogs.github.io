import { ChangeDetectorRef, Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { AuthService } from '@src/app/services/auth.service';
import { CdnService } from '@src/app/services/cdn.service';
import { User } from '@src/generated/graphql-endpoint.types';
import { Observable, Subject } from 'rxjs';
import { first, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
})
export class LoginButtonComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();
  isLoggedIn: boolean = false;
  user: Partial<User> | undefined;

  constructor(
    public cdn: CdnService,
    private authService: AuthService,
    private router: Router,
    private uiMessageService: UIMessageService,
  ) {}

  ngOnInit(): void {
    this.authService.payload$.pipe(takeUntil(this.onDestroy$)).subscribe((payload) => {
      this.user = payload?.user;
      this.isLoggedIn = payload !== undefined;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onLoginClick() {
    this.router.navigateByUrl('/login');
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigateByUrl('/home');
  }

  onProfileClick() {
    this.router.navigateByUrl(`/members/${this.user?.username}`);
  }

  onCreateProjectClick() {
    this.router.navigateByUrl('/projects/new');
  }
}
