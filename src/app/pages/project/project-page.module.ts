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

export { ProjectPageComponent };



@NgModule({
  declarations: [
    ProjectPageComponent
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
  ],
  exports: [
    ProjectPageComponent
  ]
})
export class ProjectPageModule { }
