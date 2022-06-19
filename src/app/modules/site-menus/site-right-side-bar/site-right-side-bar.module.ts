import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteRightSideBarComponent } from './site-right-side-bar/site-right-side-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from '@app/modules/_core/core.module';



@NgModule({
  declarations: [
    SiteRightSideBarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    CoreModule,
  ],
  exports: [
    SiteRightSideBarComponent
  ]
})
export class SiteRightSideBarModule { }
