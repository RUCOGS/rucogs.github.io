import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLeftSideBarComponent } from './site-left-side-bar/site-left-side-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from '@app/modules/_core/core.module';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SiteLeftSideBarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    CoreModule,
    MatIconModule,
  ],
  exports: [
    SiteLeftSideBarComponent
  ]
})
export class SiteLeftSideBarModule { }
