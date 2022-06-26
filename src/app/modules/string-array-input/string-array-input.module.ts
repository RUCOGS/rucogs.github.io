import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StringArrayInputComponent } from './string-array-input/string-array-input.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ButtonStylesModule } from '../button-styles/button-styles.module';

@NgModule({
  declarations: [StringArrayInputComponent],
  imports: [
    CommonModule,
    DragDropModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    ButtonStylesModule,
  ],
  exports: [StringArrayInputComponent],
})
export class StringArrayInputModule {}
