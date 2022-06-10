import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page/test-page.component';
import { ImageUploadModule } from '@src/app/modules/image-upload/image-upload.module';
import { CoreModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';

export { TestPageComponent };


@NgModule({
  declarations: [
    TestPageComponent
  ],
  imports: [
    CommonModule,
    ImageUploadModule,
    CoreModule,
    MatButtonModule,
  ],
  exports: [
    TestPageComponent
  ]
})
export class TestPageModule { }
