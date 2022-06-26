import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ScrollspyNavLayoutModule } from './scrollspy-nav-layout/scrollspy-nav-layout.module';
import { ScrollspyNavModule } from './scrollspy-nav/scrollspy-nav.module';

@NgModule({
  imports: [CommonModule],
  exports: [CommonModule, ScrollspyNavModule, ScrollspyNavLayoutModule],
})
export class MarkdownNavModule {}
