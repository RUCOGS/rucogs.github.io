import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ButtonStylesModule } from '@src/app/modules/button-styles/button-styles.module';
import { FilteringModule } from '@src/app/modules/filtering/filtering.module';
import { ProjectMemberModule } from '@src/app/modules/project-member/project-member.module';
import { RolesModule } from '@src/app/modules/roles/roles.module';
import { UserModule } from '@src/app/modules/user/user.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { EditMemberDialogComponent } from './edit-member-dialog/edit-member-dialog.component';
import { InviteUserDialogComponent } from './invite-user-dialog/invite-user-dialog.component';
import { InvitesTabComponent } from './invites-tab/invites-tab.component';
import { MembersTabComponent } from './members-tab/members-tab.component';
import { ForceAddUserDialogComponent } from './force-add-user-dialog/force-add-user-dialog.component';

@NgModule({
  declarations: [EditMemberDialogComponent, InviteUserDialogComponent, InvitesTabComponent, MembersTabComponent, ForceAddUserDialogComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatBadgeModule,
    MatTabsModule,
    MatTooltipModule,
    UserModule,
    MatTableModule,
    MatButtonModule,
    ButtonStylesModule,
    MatSortModule,
    MatInputModule,
    FilteringModule,
    ProjectMemberModule,
    CoreModule,
    MatDialogModule,
    ReactiveFormsModule,
    RolesModule,
  ],
  exports: [MembersTabComponent],
})
export class MembersTabModule {}
