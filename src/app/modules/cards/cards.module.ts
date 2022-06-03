import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardGridComponent } from './card-grid/card-grid.component';
import { CardComponent } from './card/card.component';



@NgModule({
  declarations: [
    CardGridComponent,
    CardComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CardGridComponent,
    CardComponent
  ]
})
export class CardsModule { }
