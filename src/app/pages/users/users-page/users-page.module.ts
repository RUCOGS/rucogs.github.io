import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users-page/users-page.component';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { UserModule } from '@src/app/modules/user/user.module';
import { Route, RouterModule } from '@angular/router';
import { UsersTabComponent } from './users-tab/users-tab.component';
import { EboardTabComponent } from './eboard-tab/eboard-tab.component';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTabStylesModule } from '@src/app/modules/mat-tab-styles/mat-tab-styles.module';
import { AvatarModule } from '@src/app/modules/avatar/avatar.module';
import { RolesModule } from '@src/app/modules/roles/roles.module';
import { MatDividerModule } from '@angular/material/divider';

export { UsersPageComponent };

const ROUTES: Route[] = [
  { path: '', component: UsersPageComponent,
    children: [
      { path: '', component: UsersTabComponent },
      { path: 'eboard', component: EboardTabComponent }
    ]
  }
];

@NgModule({
  declarations: [
    UsersPageComponent,
    UsersTabComponent,
    EboardTabComponent,
  ],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    CoreModule,
    UserModule,
    MatIconModule,
    MatTabsModule,
    MatTabStylesModule,
    AvatarModule,
    RolesModule,
    MatDividerModule
  ],
  exports: [
    UsersPageComponent
  ]
})
export class UsersPageModule { }
