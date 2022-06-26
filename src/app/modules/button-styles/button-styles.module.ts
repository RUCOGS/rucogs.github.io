import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModifierDirective } from './directives/mat-button-modifier.directive';

@NgModule({
  declarations: [MatButtonModifierDirective],
  imports: [CommonModule],
  exports: [MatButtonModifierDirective],
})
export class ButtonStylesModule {}
