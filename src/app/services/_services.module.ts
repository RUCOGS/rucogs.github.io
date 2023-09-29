import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ApolloModule } from 'apollo-angular';
import { AuthService } from './auth.service';
import { BackendService } from './backend.service';
import { BreakpointManagerService } from './breakpoint-manager.service';
import { CdnService } from './cdn.service';
import { OverlayService } from './overlay.service';
import { RolesService } from './roles.service';
import { ScrollService } from './scroll.service';
import { SecurityService } from './security.service';
import { StyleManagerService } from './style-manager.service';
import { ThemeManagerService } from './theme-manager.service';
import { TokenStorageService } from './token-storage.service';
import { AuthSetupService } from './auth-setup.service';

export { AuthSetupService };
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
export { OverlayService };

@NgModule({
  declarations: [],
  imports: [CommonModule, ApolloModule, MatSnackBarModule, MatDialogModule],
  providers: [],
})
export class ServicesModule {}
