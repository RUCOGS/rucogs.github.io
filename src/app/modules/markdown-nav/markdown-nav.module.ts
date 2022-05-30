import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '@visurel/iconify-angular';
import { ScrollspyNavLayoutModule } from './scrollspy-nav-layout/scrollspy-nav-layout.module';
import { ScrollspyNavModule } from './scrollspy-nav/scrollspy-nav.module';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    IconModule,
  ],
  exports: [
    CommonModule,
    FlexLayoutModule,
    ScrollspyNavModule,
    ScrollspyNavLayoutModule
  ],
})
export class MarkdownNavModule { }
