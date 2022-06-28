import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonStylesModule } from '@src/app/modules/button-styles/button-styles.module';
import { ImageUploadModule } from '@src/app/modules/image-upload/image-upload.module';
import { ProjectModule } from '@src/app/modules/project/project.module';
import { RolesModule } from '@src/app/modules/roles/roles.module';
import { TagsModule } from '@src/app/modules/tags/tags.module';
import { UserModule } from '@src/app/modules/user/user.module';
import { EditUserDialogComponent } from './edit-user-dialog/edit-user-dialog.component';
import { OverviewTabComponent } from './overview-tab/overview-tab.component';

@NgModule({
  declarations: [EditUserDialogComponent, OverviewTabComponent],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TagsModule,
    UserModule,
    MatDividerModule,
    RolesModule,
    ProjectModule,
    MatIconModule,
    MatSelectModule,
    ImageUploadModule,
    ReactiveFormsModule,
    MatButtonModule,
    ButtonStylesModule,
    MatInputModule,
  ],
  exports: [OverviewTabComponent],
})
export class OverviewTabModule {}
