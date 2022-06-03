import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HamburgerMenuComponent } from './hamburger-menu/hamburger-menu.component';
import { HorizontalMenuComponent } from './horizontal-menu/horizontal-menu.component';
import { SiteHeaderComponent } from './site-header/site-header.component';
import { CogsLogoTextButtonComponent } from './cogs-logo-text-button/cogs-logo-text-button.component';
import { DarkModeToggleComponent } from './dark-mode-toggle/dark-mode-toggle.component';



@NgModule({
  declarations: [
    CogsLogoTextButtonComponent,
    DarkModeToggleComponent,
    HamburgerMenuComponent,
    HorizontalMenuComponent,
    SiteHeaderComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SiteHeaderComponent,
  ]
})
export class SiteHeaderModule { }
