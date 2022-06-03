import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersPageComponent } from './users/users-page.component';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { UserModule } from '@src/app/modules/user/user.module';

export { UsersPageComponent };


@NgModule({
  declarations: [
    UsersPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    UserModule
  ],
  exports: [
    UsersPageComponent
  ]
})
export class UsersPageModule { }
