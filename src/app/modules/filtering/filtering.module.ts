import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterHeaderComponent } from './filter-header/filter-header.component';
import { FormsModule } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

export { FilterHeaderComponent };


@NgModule({
  declarations: [
    FilterHeaderComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatOptionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  exports: [
    FilterHeaderComponent,
  ]
})
export class FilteringModule { }
