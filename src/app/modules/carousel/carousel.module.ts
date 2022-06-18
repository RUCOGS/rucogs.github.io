import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonStylesModule } from '../button-styles/button-styles.module';
import { CarouselComponent } from './carousel/carousel.component';
import { CarouselItemDirective } from './carousel-item/carousel-item.directive';
import { MatIconModule } from '@angular/material/icon';



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
    MatIconModule
  ],
  exports: [
    CarouselComponent,
    CarouselItemDirective
  ]
})
export class CarouselModule { }
