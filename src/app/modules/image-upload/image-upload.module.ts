import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageUploadComponent } from './image-upload/image-upload.component';
import { UtilsModule } from '@src/app/utils/_utils.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    ImageUploadComponent
  ],
  imports: [
    CommonModule,
    UtilsModule,
    MatButtonModule,
    MatIconModule,
  ],
  exports: [
    ImageUploadComponent
  ]
})
export class ImageUploadModule { }
