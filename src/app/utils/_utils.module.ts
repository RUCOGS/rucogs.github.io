import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export * from './file-utils';
export * from './utils';
export * from './form-utils';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class UtilsModule {}
