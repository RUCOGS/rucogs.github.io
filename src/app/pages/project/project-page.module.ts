import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AvatarModule } from '@src/app/modules/avatar/avatar.module';
import { ButtonStylesModule } from '@src/app/modules/button-styles/button-styles.module';
import { CarouselModule } from '@src/app/modules/carousel/carousel.module';
import { FilteringModule } from '@src/app/modules/filtering/filtering.module';
import { ImageUploadModule } from '@src/app/modules/image-upload/image-upload.module';
import { ProjectMemberModule } from '@src/app/modules/project-member/project-member.module';
import { RolesModule } from '@src/app/modules/roles/roles.module';
import { StringArrayInputModule } from '@src/app/modules/string-array-input/string-array-input.module';
import { TagsModule } from '@src/app/modules/tags/tags.module';
import { UIMessageModule } from '@src/app/modules/ui-message/ui-message.module';
import { UserModule } from '@src/app/modules/user/user.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { ServicesModule } from '@src/app/services/_services.module';
import { SettingsModule } from '@src/app/settings/_settings.module';
import { UtilsModule } from '@src/app/utils/_utils.module';
import { IconModule } from '@visurel/iconify-angular';
import { MarkdownModule } from 'ngx-markdown';
import { EditMemberDialogComponent } from './edit-member-dialog/edit-member-dialog.component';
import { EditProjectDialogComponent } from './edit-project-dialog/edit-project-dialog.component';
import { InviteUserDialogComponent } from './invite-user-dialog/invite-user-dialog.component';
import { InvitesTabComponent } from './invites-tab/invites-tab.component';
import { MembersTabComponent } from './members-tab/members-tab.component';
import { OverviewTabComponent } from './overview-tab/overview-tab.component';
import { ProjectPageComponent } from './project-page/project-page.component';

export { ProjectPageComponent };


@NgModule({
  declarations: [
    ProjectPageComponent,
    MembersTabComponent,
    OverviewTabComponent,
    EditProjectDialogComponent,
    EditMemberDialogComponent,
    InvitesTabComponent,
    InviteUserDialogComponent
  ],
  imports: [
    CommonModule,
    ImageUploadModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    CoreModule,
    ProjectMemberModule,
    MarkdownModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    UtilsModule,
    UIMessageModule,
    SettingsModule,
    MatSelectModule,
    MatTabsModule,
    MatDialogModule,
    ServicesModule,
    AvatarModule,
    FilteringModule,
    UserModule,
    DragDropModule,
    MatTooltipModule,
    RolesModule,
    MatTableModule,
    MatBadgeModule,
    MatSortModule,
    IconModule,
    ButtonStylesModule,
    TagsModule,
    StringArrayInputModule,
    CarouselModule,
  ],
  exports: [
    ProjectPageComponent
  ]
})
export class ProjectPageModule { }
