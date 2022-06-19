import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SiteLeftSideBarComponent } from './site-left-side-bar/site-left-side-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { CoreModule } from '@app/modules/_core/core.module';
import { MatIconModule } from '@angular/material/icon';
import { SideBarButtonComponent } from './side-bar-button/side-bar-button.component';
import { ServicesModule } from '@src/app/services/_services.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    SiteLeftSideBarComponent,
    SideBarButtonComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    CoreModule,
    MatIconModule,
    ServicesModule,
    MatTooltipModule,
    RouterModule
  ],
  exports: [
    SiteLeftSideBarComponent
  ]
})
export class SiteLeftSideBarModule { }
