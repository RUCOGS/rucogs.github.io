import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatCommonModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CoreModule } from '@app/modules/_core/core.module';
import { IconModule } from '@visurel/iconify-angular';
import { CogsLogoTextButtonComponent } from './cogs-logo-text-button/cogs-logo-text-button.component';
import { DarkModeToggleComponent } from './dark-mode-toggle/dark-mode-toggle.component';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { HeaderSocialMediaButtonsComponent } from './header-social-media-buttons/header-social-media-buttons.component';
import { HorizontalMenuComponent } from './horizontal-menu/horizontal-menu.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { LoginButtonComponent } from './login-button/login-button.component';
import { RouterModule } from '@angular/router';
import { ServicesModule } from '@src/app/services/_services.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    CogsLogoTextButtonComponent,
    DarkModeToggleComponent,
    HamburgerMenuComponent,
    HeaderSocialMediaButtonsComponent,
    HorizontalMenuComponent,
    SiteHeaderComponent,
    LoginButtonComponent,
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
    BrowserModule,
    BrowserAnimationsModule,
  ],
  exports: [
    SiteHeaderComponent,
  ]
})
export class SiteHeaderModule { }
