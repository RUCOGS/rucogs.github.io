import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { Route, RouterModule } from '@angular/router';
import { MembersTabModule } from './members-tab/members-tab.module';
import { OverviewTabModule } from './overview-tab/overview-tab.module';
import { SettingsTabModule } from './settings-tab/settings-tab.module';
import { ProjectPageComponent } from './_project-page/project-page.component';

const ROUTES: Route[] = [{ path: '', component: ProjectPageComponent }];

@NgModule({
  declarations: [ProjectPageComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    MembersTabModule,
    OverviewTabModule,
    SettingsTabModule,
    MatIconModule,
    MatTabsModule,
  ],
})
export class ProjectPageModule {}
