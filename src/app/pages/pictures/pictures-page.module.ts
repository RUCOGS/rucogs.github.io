import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ClassesModule } from '@src/app/classes/_classes.module';
import { ImageGalleryModule } from '@src/app/modules/image-gallery/image-gallery.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { PicturesPageComponent } from './pictures-page/pictures-page.component';

const ROUTES: Route[] = [
  {
    path: '',
    component: PicturesPageComponent,
    data: {
      title: 'Pictures',
    },
  },
];

@NgModule({
  declarations: [PicturesPageComponent],
  imports: [RouterModule.forChild(ROUTES), CommonModule, CoreModule, ClassesModule, ImageGalleryModule],
})
export class PicturesPageModule {}
