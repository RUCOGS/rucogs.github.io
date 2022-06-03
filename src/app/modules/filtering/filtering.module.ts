import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterHeaderComponent } from './filter-header/filter-header.component';

export { FilterHeaderComponent } from './filter-header/filter-header.component';


@NgModule({
  declarations: [
    FilterHeaderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterHeaderComponent,
  ]
})
export class FilteringModule { }
