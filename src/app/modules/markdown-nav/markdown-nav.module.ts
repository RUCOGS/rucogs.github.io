import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ScrollspyNavLayoutModule } from './scrollspy-nav-layout/scrollspy-nav-layout.module';
import { ScrollspyNavModule } from './scrollspy-nav/scrollspy-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    ScrollspyNavModule,
    ScrollspyNavLayoutModule
  ],
})
export class MarkdownNavModule { }
