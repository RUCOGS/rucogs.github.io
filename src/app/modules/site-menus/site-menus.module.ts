import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteHeaderModule } from './site-header/site-header.module';
import { SiteFooterModule } from './site-footer/site-footer.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SiteHeaderModule,
    SiteFooterModule,
  ],
  exports: [
    SiteHeaderModule,
    SiteFooterModule,
  ]
})
export class SiteMenusModule { }
