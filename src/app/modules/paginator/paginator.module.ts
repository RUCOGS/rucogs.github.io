import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator/paginator.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IconModule } from '@visurel/iconify-angular';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';

export { PaginatorComponent } from './paginator/paginator.component';


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
  ],
  exports: [
    PaginatorComponent
  ]
})
export class PaginatorModule { }
