import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthService } from './auth.service';
import { BackendService } from './backend.service';
import { BreakpointManagerService } from './breakpoint-manager.service';
import { CdnService } from './cdn.service';
import { ScrollService } from './scroll.service';
import { SecurityService } from './security.service';
import { StyleManagerService } from './style-manager.service';
import { ThemeManagerService } from './theme-manager.service';
import { TokenStorageService } from './token-storage.service';
import { RolesService } from './roles.service';

export { AuthService };
export { BackendService };
export { BreakpointManagerService };
export { CdnService };
export { ScrollService };
export { SecurityService };
export { StyleManagerService };
export { ThemeManagerService };
export { TokenStorageService };
export { RolesService };


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ],
  providers: [
    AuthService,
    BackendService,
    BreakpointManagerService,
    CdnService,
    ScrollService,
    SecurityService,
    StyleManagerService,
    ThemeManagerService,
    TokenStorageService,
    RolesService
  ]
})
export class ServicesModule { }
