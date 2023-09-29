import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { BackendService } from './backend.service';
import { SecurityService } from './security.service';
import { takeUntil } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthSetupService {

  constructor(private authService: AuthService, private securityService: SecurityService, private backendService: BackendService, private router: Router) {
    authService.payload$.pipe(takeUntil(authService.onDestroy$)).subscribe({
      next: async (data) => {
        backendService.rebuildClient();
        if (data)
          securityService.fetchData();
      },
    });
  }
}
