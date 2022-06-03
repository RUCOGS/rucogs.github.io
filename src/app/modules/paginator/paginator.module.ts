import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';

export { PaginatorComponent } from './paginator/paginator.component';


@NgModule({
  declarations: [
    PaginatorComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginatorComponent
  ]
})
export class PaginatorModule { }
