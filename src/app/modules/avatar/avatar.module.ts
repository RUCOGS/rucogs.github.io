import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from './avatar/avatar.component';
import { AvatarGroupComponent } from './avatar-group/avatar-group.component';



@NgModule({
  declarations: [
    AvatarComponent,
    AvatarGroupComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    AvatarComponent,
    AvatarGroupComponent
  ]
})
export class AvatarModule { }
