import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicturesPageComponent } from './pictures-page/pictures-page.component';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { ClassesModule } from '@src/app/classes/_classes.module';
import { ImageGalleryModule } from '@src/app/modules/image-gallery/image-gallery.module';

export { PicturesPageComponent };


@NgModule({
  declarations: [
    PicturesPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ClassesModule,
    ImageGalleryModule
  ],
  exports: [
    PicturesPageComponent
  ]
})
export class PicturesPageModule { }
