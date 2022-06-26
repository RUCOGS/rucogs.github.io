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
import { ApolloModule } from 'apollo-angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';

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
  imports: [CommonModule, ApolloModule, MatSnackBarModule, MatDialogModule],
  providers: [],
})
export class ServicesModule {}
