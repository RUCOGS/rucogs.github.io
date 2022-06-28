import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Route, RouterModule } from '@angular/router';
import { EboardTabModule } from './eboard-tab/eboard-tab.module';
import { InvitesTabModule } from './invites-tab/invites-tab.module';
import { OverviewTabModule } from './overview-tab/overview-tab.module';
import { SettingsTabModule } from './settings-tab/settings-tab.module';
import { UserPageComponent } from './user-page/user-page.component';

const ROUTES: Route[] = [{ path: '', component: UserPageComponent }];

@NgModule({
  declarations: [UserPageComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    EboardTabModule,
    SettingsTabModule,
    OverviewTabModule,
    InvitesTabModule,

    MatTabsModule,
    MatIconModule,
  ],
  exports: [UserPageComponent],
})
export class UserPageModule {}
