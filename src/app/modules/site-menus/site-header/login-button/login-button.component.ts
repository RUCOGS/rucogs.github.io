import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '@src/app/services/auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-login-button',
  templateUrl: './login-button.component.html',
  styleUrls: ['./login-button.component.css']
})
export class LoginButtonComponent implements OnInit, OnDestroy {

  @Output() click = new EventEmitter();

  onDestroy$ = new Subject<void>();
  isLoggedIn: boolean = false;
  text: string = "Login";

  constructor(
    private router: Router,
    private authService: AuthService
  ) {   
    authService.payload$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe({
        next: (payload) => {
          this.isLoggedIn = payload !== undefined;
          this.text = this.isLoggedIn ? "Logout" : "Login";
        }
      })
  }

  ngOnInit(): void {
  }
  
  ngOnDestroy(): void {
    this.onDestroy$.next();
  }

  onClick() {
    if (this.isLoggedIn) {
      this.authService.logout();
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/login');
    }
    this.click.emit();
  }
}
