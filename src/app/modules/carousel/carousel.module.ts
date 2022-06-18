import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonStylesModule } from '../button-styles/button-styles.module';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemDirective } from './carousel-item/carousel-item.directive';
import { MatIconModule } from '@angular/material/icon';
import { UtilsModule } from '@src/app/utils/_utils.module';
import { ServicesModule } from '@src/app/services/_services.module';



@NgModule({
  declarations: [
    CarouselComponent,
    CarouselItemDirective
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    ButtonStylesModule,
    BrowserAnimationsModule,
    MatIconModule,
    UtilsModule,
    ServicesModule
  ],
  exports: [
    CarouselComponent,
    CarouselItemDirective
  ]
})
export class CarouselModule { }
