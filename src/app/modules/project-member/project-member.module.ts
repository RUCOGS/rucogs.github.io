import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectMemberProfileComponent } from './project-member-profile/project-member-profile.component';
import { AvatarModule } from '../avatar/avatar.module';
import { UserModule } from '../user/user.module';
import { RolesModule } from '../roles/roles.module';
import { ProjectMembersDisplayComponent } from './project-members-display/project-members-display.component';



@NgModule({
  declarations: [
    ProjectMemberProfileComponent,
    ProjectMembersDisplayComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    UserModule,
    RolesModule
  ],
  exports: [
    ProjectMemberProfileComponent,
    ProjectMembersDisplayComponent
  ]
})
export class ProjectMemberModule { }
