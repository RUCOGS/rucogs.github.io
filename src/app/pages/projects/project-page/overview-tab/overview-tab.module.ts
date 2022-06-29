import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ButtonStylesModule } from '@src/app/modules/button-styles/button-styles.module';
import { CarouselModule } from '@src/app/modules/carousel/carousel.module';
import { ImageUploadModule } from '@src/app/modules/image-upload/image-upload.module';
import { ProjectMemberModule } from '@src/app/modules/project-member/project-member.module';
import { StringArrayInputModule } from '@src/app/modules/string-array-input/string-array-input.module';
import { TagsModule } from '@src/app/modules/tags/tags.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { IconModule } from '@visurel/iconify-angular';
import { MarkdownModule } from 'ngx-markdown';
import { EditProjectDialogComponent } from './edit-project-dialog/edit-project-dialog.component';
import { OverviewTabComponent } from './overview-tab/overview-tab.component';

@NgModule({
  declarations: [EditProjectDialogComponent, OverviewTabComponent],
  imports: [
    CommonModule,
    ProjectMemberModule,
    MatDividerModule,
    MatInputModule,
    MatButtonModule,
    ButtonStylesModule,
    CoreModule,
    CarouselModule,
    IconModule,
    MarkdownModule,
    TagsModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    StringArrayInputModule,
    ImageUploadModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatNativeDateModule,
  ],
  exports: [OverviewTabComponent],
})
export class OverviewTabModule {}
