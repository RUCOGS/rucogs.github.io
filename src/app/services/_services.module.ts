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

export { AuthService } from './auth.service';
export { BackendService } from './backend.service';
export { BreakpointManagerService } from './breakpoint-manager.service';
export { CdnService } from './cdn.service';
export { ScrollService } from './scroll.service';
export { SecurityService } from './security.service';
export { StyleManagerService } from './style-manager.service';
export { ThemeManagerService } from './theme-manager.service';
export { TokenStorageService } from './token-storage.service';


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
    TokenStorageService
  ]
})
export class PagesModule { }
