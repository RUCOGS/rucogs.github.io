import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home/home-page.component';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardsModule } from '@src/app/modules/cards/cards.module';

export { HomePageComponent }


@NgModule({
  declarations: [
    HomePageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatExpansionModule,
    CardsModule,
  ],
  exports: [
    HomePageComponent
  ]
})
export class HomePageModule { }
