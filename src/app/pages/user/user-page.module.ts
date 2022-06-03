import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPageComponent } from './user/user-page.component';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { ProjectModule } from '@src/app/modules/project/project.module';
import { CardsModule } from '@src/app/modules/cards/cards.module';
import { MatDividerModule } from '@angular/material/divider';
import { RolesModule } from '@src/app/modules/roles/roles.module';
import { UserModule } from '@src/app/modules/user/user.module';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

export { UserPageComponent };


@NgModule({
  declarations: [
    UserPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ProjectModule,
    CardsModule,
    MatDividerModule,
    RolesModule,
    UserModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  exports: [
    UserPageComponent
  ]
})
export class UserPageModule { }
