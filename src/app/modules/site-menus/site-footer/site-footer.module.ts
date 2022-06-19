import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteFooterComponent } from './site-footer/site-footer.component';
import { FooterSocialMediaButtonsComponent } from './footer-social-media-buttons/footer-social-media-buttons.component';
import { IconModule } from '@visurel/iconify-angular';



@NgModule({
  declarations: [
    SiteFooterComponent,
    FooterSocialMediaButtonsComponent
  ],
  imports: [
    CommonModule,
    IconModule
  ],
  exports: [
    SiteFooterComponent
  ]
})
export class SiteFooterModule { }
