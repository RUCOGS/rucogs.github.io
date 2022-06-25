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
import { MatTooltipModule } from '@angular/material/tooltip';
import { EboardTabComponent } from './eboard-tab/eboard-tab.component';
import { EditEboardDialogComponent } from './edit-eboard-dialog/edit-eboard-dialog.component';
import { EditEboardTermDialogComponent } from './edit-eboard-term-dialog/edit-eboard-term-dialog.component';
import { AddEboardTermDialogComponent } from './add-eboard-term-dialog/add-eboard-term-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { TagsModule } from '@src/app/modules/tags/tags.module';

const ROUTES: Route[] = [
  { path: '', component: UserPageComponent }
];

@NgModule({
  declarations: [
    UserPageComponent,
    OverviewTabComponent,
    EditUserDialogComponent,
    InvitesTabComponent,
    SettingsTabComponent,
    EboardTabComponent,
    EditEboardDialogComponent,
    EditEboardTermDialogComponent,
    AddEboardTermDialogComponent
  ],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    CoreModule,
    ProjectModule,
    CardsModule,
    MatDividerModule,
    MatSelectModule,
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
    ProjectModule,
    TagsModule,
    MatTooltipModule,
  ],
  exports: [
    UserPageComponent
  ]
})
export class UserPageModule { }
