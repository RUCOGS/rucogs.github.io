import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectPageComponent } from './project-page/project-page.component';
import { ImageUploadModule } from '@src/app/modules/image-upload/image-upload.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { ProjectMemberModule } from '@src/app/modules/project-member/project-member.module';
import { MarkdownModule } from 'ngx-markdown';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UtilsModule } from '@src/app/utils/_utils.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { UIMessageModule } from '@src/app/modules/ui-message/ui-message.module';
import { SettingsModule } from '@src/app/settings/_settings.module';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MembersTabComponent } from './members-tab/members-tab.component';
import { OverviewTabComponent } from './overview-tab/overview-tab.component';
import { EditProjectDialogComponent } from './edit-project-dialog/edit-project-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

export { ProjectPageComponent };



@NgModule({
  declarations: [
    ProjectPageComponent,
    MembersTabComponent,
    OverviewTabComponent,
    EditProjectDialogComponent
  ],
  imports: [
    CommonModule,
    ImageUploadModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    CoreModule,
    ProjectMemberModule,
    MarkdownModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    UtilsModule,
    UIMessageModule,
    SettingsModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
  ],
  exports: [
    ProjectPageComponent
  ]
})
export class ProjectPageModule { }
