import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

export * from './file-utils';
export * from './overlay-utils';
export * from './user-utils';
export * from './utils';

@NgModule({
  declarations: [],
  imports: [CommonModule],
})
export class UtilsModule {}
