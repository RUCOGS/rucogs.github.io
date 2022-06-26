import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PicturesPageComponent } from './pictures-page/pictures-page.component';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { ClassesModule } from '@src/app/classes/_classes.module';
import { ImageGalleryModule } from '@src/app/modules/image-gallery/image-gallery.module';
import { Route, RouterModule } from '@angular/router';

const ROUTES: Route[] = [{ path: '', component: PicturesPageComponent }];

@NgModule({
  declarations: [PicturesPageComponent],
  imports: [RouterModule.forChild(ROUTES), CommonModule, CoreModule, ClassesModule, ImageGalleryModule],
})
export class PicturesPageModule {}
