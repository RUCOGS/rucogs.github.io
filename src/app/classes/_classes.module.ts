import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export * from './article-info';
export * from './image-info';
export * from './color';
export * from './pagelink';
export * from './custom-validators';
export * from './process-monitor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class ClassesModule { }
