import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonStylesModule } from '@src/app/modules/button-styles/button-styles.module';
import { CardsModule } from '@src/app/modules/cards/cards.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { CreateLoginIdentityDialogComponent } from './create-login-identity-dialog/create-login-identity-dialog.component';
import { EditLoginIdentityDialogComponent } from './edit-login-identity-dialog/edit-login-identity-dialog.component';
import { EditUserPrivateDialogComponent } from './edit-user-private-dialog/edit-user-private-dialog.component';
import { LinkNetIdDialogComponent } from './link-netid-dialog/link-netid-dialog.component';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    SettingsTabComponent,
    CreateLoginIdentityDialogComponent,
    EditLoginIdentityDialogComponent,
    EditUserPrivateDialogComponent,
    LinkNetIdDialogComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    CardsModule,
    MatTooltipModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    ButtonStylesModule,
    MatCheckboxModule,
  ],
  exports: [SettingsTabComponent],
})
export class SettingsTabModule {}
