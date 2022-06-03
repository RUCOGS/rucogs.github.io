import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicturesComponent } from './pictures/pictures.component';

export { PicturesComponent } from './pictures/pictures.component';


@NgModule({
  declarations: [
    PicturesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PicturesComponent
  ]
})
export class PicturesModule { }
