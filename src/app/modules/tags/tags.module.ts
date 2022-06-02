import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagComponent } from './tag/tag.component';
import { TagContainerComponent } from './tag-container/tag-container.component';

@NgModule({
  declarations: [
    TagContainerComponent,
    TagComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TagContainerComponent,
    TagComponent
  ]
})
export class TagsModule { }
