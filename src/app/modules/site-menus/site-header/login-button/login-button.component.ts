import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { AuthService } from '@src/app/services/auth.service';
import { CdnService } from '@src/app/services/cdn.service';
import { SecurityService } from '@src/app/services/security.service';
import { Permission, User } from '@src/generated/graphql-endpoint.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css'],
})
export class LoginButtonComponent implements OnInit, OnDestroy {
  onDestroy$ = new Subject<void>();
  isLoggedIn: boolean = false;
  canCreateProject: boolean = false;
  user: Partial<User> | undefined;

  constructor(
    public cdn: CdnService,
    private authService: AuthService,
    private router: Router,
    private uiMessageService: UIMessageService,
    private security: SecurityService,
  ) {}

  async ngOnInit() {
    await this.security.waitUntilReady();

    this.authService.payload$.pipe(takeUntil(this.onDestroy$)).subscribe((payload) => {
      this.user = payload?.user;
      this.isLoggedIn = payload !== undefined;
    });

    this.security.dataFetched$.pipe(takeUntil(this.onDestroy$)).subscribe((data) => {
      this.canCreateProject = this.security.makePermCalc().hasPermission(Permission.CreateProject);
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
  }

  onProfileClick() {
    this.router.navigateByUrl(`/members/${this.user?.username}`);
  }

  onCreateProjectClick() {
    this.router.navigateByUrl('/projects/new');
  }
}
