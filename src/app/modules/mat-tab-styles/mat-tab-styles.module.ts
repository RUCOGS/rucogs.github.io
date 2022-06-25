import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabStylesDirective } from './mat-tab-styles.directive';



@NgModule({
  declarations: [
    MatTabStylesDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    MatTabStylesDirective
  ]
})
export class MatTabStylesModule { }
