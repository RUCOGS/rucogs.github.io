import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { FilteringModule } from '../filtering/filtering.module';

export { PaginatorComponent } from './paginator/paginator.component';
export * from './classes/base-filtered-scroll-pagination-component';
export * from './classes/base-scroll-pagination-component';
export * from './classes/base-filtered-header-scroll-pagination-component';


@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    IconModule,
    MatButtonToggleModule,
    MatInputModule,
    FilteringModule,
  ],
  exports: [
    PaginatorComponent
  ]
})
export class PaginatorModule { }
