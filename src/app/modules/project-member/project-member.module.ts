import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectMemberProfileComponent } from './project-member-profile/project-member-profile.component';
import { AvatarModule } from '../avatar/avatar.module';
import { UserModule } from '../user/user.module';
import { RolesModule } from '../roles/roles.module';
import { ProjectMembersDisplayComponent } from './project-members-display/project-members-display.component';
import { EditableProjectMemberProfileComponent } from './editable-project-member-profile/editable-project-member-profile.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectMembersInputComponent } from './project-members-input/project-members-input.component';
import { CardsModule } from '../cards/cards.module';
import { MatIconModule } from '@angular/material/icon';
import { UtilsModule } from '@src/app/utils/_utils.module';



@NgModule({
  declarations: [
    ProjectMemberProfileComponent,
    ProjectMembersDisplayComponent,
    EditableProjectMemberProfileComponent,
    ProjectMembersInputComponent
  ],
  imports: [
    CommonModule,
    AvatarModule,
    UserModule,
    RolesModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    UserModule,
    CardsModule,
    MatIconModule,
    UtilsModule
  ],
  exports: [
    ProjectMemberProfileComponent,
    ProjectMembersDisplayComponent,
    EditableProjectMemberProfileComponent,
    ProjectMembersInputComponent,
  ]
})
export class ProjectMemberModule { }
