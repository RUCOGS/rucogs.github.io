import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicProfileComponent } from './basic-profile/basic-profile.component';
import { AvatarModule } from '../avatar/avatar.module';
import { ProfileGridComponent } from './profile-grid/profile-grid.component';



@NgModule({
  declarations: [
    BasicProfileComponent,
    ProfileGridComponent
  ],
  imports: [
    CommonModule,
    AvatarModule
  ],
  exports: [
    BasicProfileComponent,
    ProfileGridComponent
  ]
})
export class ProfileModule { }
