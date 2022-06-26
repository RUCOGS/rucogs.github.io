import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteHeaderModule } from './site-header/site-header.module';
import { SiteFooterModule } from './site-footer/site-footer.module';
import { SiteLeftSideBarModule } from './site-left-side-bar/site-left-side-bar.module';
import { SiteRightSideBarModule } from './site-right-side-bar/site-right-side-bar.module';
import { AvatarModule } from '../avatar/avatar.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, SiteHeaderModule, SiteFooterModule, SiteLeftSideBarModule, SiteRightSideBarModule],
  exports: [SiteHeaderModule, SiteFooterModule, SiteLeftSideBarModule, SiteRightSideBarModule],
})
export class SiteMenusModule {}
