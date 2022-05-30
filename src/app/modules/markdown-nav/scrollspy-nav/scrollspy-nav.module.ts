import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IconModule } from '@visurel/iconify-angular';

import { ScrollspyNavComponent } from './scrollspy-nav.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    IconModule,
  ],
  declarations: [ScrollspyNavComponent],
  exports: [ScrollspyNavComponent],
})
export class ScrollspyNavModule { }
