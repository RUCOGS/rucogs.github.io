import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';
import { AvatarModule } from '@app/modules/avatar/avatar.module';
import { CoreModule } from '@app/modules/_core/core.module';
import { ServicesModule } from '@src/app/services/_services.module';
import { IconModule } from '@visurel/iconify-angular';
import { CogsLogoTextButtonComponent } from './cogs-logo-text-button/cogs-logo-text-button.component';
import { DarkModeToggleComponent } from './dark-mode-toggle/dark-mode-toggle.component';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { HeaderSocialMediaButtonsComponent } from './header-social-media-buttons/header-social-media-buttons.component';
import { HorizontalMenuComponent } from './horizontal-menu/horizontal-menu.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { TextButtonComponent } from './text-button/text-button.component';

@NgModule({
  declarations: [
    CogsLogoTextButtonComponent,
    DarkModeToggleComponent,
    HamburgerMenuComponent,
    HeaderSocialMediaButtonsComponent,
    HorizontalMenuComponent,
    SiteHeaderComponent,
    LoginButtonComponent,
    TextButtonComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    IconModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    RouterModule,
    ServicesModule,
    AvatarModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule,
  ],
  exports: [SiteHeaderComponent],
})
export class SiteHeaderModule {}
