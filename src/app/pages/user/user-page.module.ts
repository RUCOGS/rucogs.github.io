import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user-page/user-page.component';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { ProjectModule } from '@src/app/modules/project/project.module';
import { CardsModule } from '@src/app/modules/cards/cards.module';
import { MatDividerModule } from '@angular/material/divider';
import { RolesModule } from '@src/app/modules/roles/roles.module';
import { UserModule } from '@src/app/modules/user/user.module';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UIMessageModule } from '@src/app/modules/ui-message/ui-message.module';
import { ImageUploadModule } from '@src/app/modules/image-upload/image-upload.module';
import { SettingsModule } from '@src/app/settings/_settings.module';
import { Route, RouterModule } from '@angular/router';
import { OverviewTabComponent } from './overview-tab/overview-tab.component';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { InvitesTabComponent } from './invites-tab/invites-tab.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { FilteringModule } from '@src/app/modules/filtering/filtering.module';
import { MatDialogModule } from '@angular/material/dialog';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';

export { UserPageComponent };


const ROUTES: Route[] = [
  { path: "**", component: UserPageComponent }
];

@NgModule({
  declarations: [
    UserPageComponent,
    OverviewTabComponent,
    EditUserDialogComponent,
    InvitesTabComponent,
    SettingsTabComponent
  ],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    CoreModule,
    ProjectModule,
    CardsModule,
    MatDividerModule,
    RolesModule,
    UserModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    UIMessageModule,
    ImageUploadModule,
    SettingsModule,
    RouterModule,
    MatTabsModule,
    MatTableModule,
    FilteringModule,
    MatDialogModule,
    ProjectModule
  ],
  exports: [
    UserPageComponent
  ]
})
export class UserPageModule { }