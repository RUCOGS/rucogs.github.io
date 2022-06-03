import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageGalleryComponent } from './image-gallery/image-gallery.component';
import { ImageGalleryItemComponent } from './image-gallery-item/image-gallery-item.component';



@NgModule({
  declarations: [
    ImageGalleryComponent,
    ImageGalleryItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImageGalleryComponent,
    ImageGalleryItemComponent
  ]
})
export class ImageGalleryModule { }
