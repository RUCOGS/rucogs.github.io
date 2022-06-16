import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { ServicesModule } from '@src/app/services/_services.module';
import { IconModule } from '@visurel/iconify-angular';
import { MarkdownModule } from 'ngx-markdown';

import { ScrollspyNavModule } from '../scrollspy-nav/scrollspy-nav.module';
import { ScrollspyNavLayoutComponent } from './scrollspy-nav-layout.component';

@NgModule({
  imports: [
    CommonModule,
    MarkdownModule,
    MatButtonModule,
    MatDividerModule,
    ScrollspyNavModule,
    ServicesModule,
    IconModule,
  ],
  declarations: [ScrollspyNavLayoutComponent],
  exports: [ScrollspyNavLayoutComponent],
})
export class ScrollspyNavLayoutModule { }
