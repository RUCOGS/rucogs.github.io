import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { Route, RouterModule } from '@angular/router';
import { ButtonStylesModule } from '@src/app/modules/button-styles/button-styles.module';
import { EBoardModule } from '@src/app/modules/eboard/eboard.module';
import { MatTabStylesModule } from '@src/app/modules/mat-tab-styles/mat-tab-styles.module';
import { UserModule } from '@src/app/modules/user/user.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { CreateUserDialogComponent } from './create-user-dialog/create-user-dialog.component';
import { EboardTabComponent } from './eboard-tab/eboard-tab.component';
import { UsersPageComponent } from './users-page/users-page.component';
import { UsersTabComponent } from './users-tab/users-tab.component';

export { UsersPageComponent };

const ROUTES: Route[] = [
  {
    path: '',
    component: UsersPageComponent,
    children: [
      { path: '', component: UsersTabComponent, data: { titleAll: 'Members' } },
      { path: 'eboard', component: EboardTabComponent, data: { titleAll: 'E-Board' } },
    ],
  },
];

@NgModule({
  declarations: [UsersPageComponent, UsersTabComponent, EboardTabComponent, CreateUserDialogComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    CoreModule,
    UserModule,
    MatIconModule,
    MatTabsModule,
    MatTabStylesModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    ButtonStylesModule,
    EBoardModule,
  ],
  exports: [UsersPageComponent],
})
export class UsersPageModule {}
