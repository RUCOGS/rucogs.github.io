import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag/tag.component';
import { TagContainerComponent } from './tag-container/tag-container.component';
import { TagsInputComponent } from './tags-input/tags-input.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BaseCustomInputModule } from '../base-custom-input/base-custom-input.module';

@NgModule({
  declarations: [
    TagContainerComponent,
    TagComponent,
    TagsInputComponent,
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    BaseCustomInputModule,
  ],
  exports: [
    TagContainerComponent,
    TagComponent,
    TagsInputComponent
  ]
})
export class TagsModule { }
