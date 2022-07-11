import { A11yModule } from '@angular/cdk/a11y';
import { OverlayModule } from '@angular/cdk/overlay';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { FilteringModule } from '@app/modules/filtering/filtering.module';
import { ServicesModule } from '@src/app/services/_services.module';
import { IconModule } from '@visurel/iconify-angular';
import { AvatarModule } from '../avatar/avatar.module';
import { ButtonStylesModule } from '../button-styles/button-styles.module';
import { RolesModule } from '../roles/roles.module';
import { TagsModule } from '../tags/tags.module';
import { BasicProfileComponent } from './basic-profile/basic-profile.component';
import { EboardProfileComponent } from './eboard-profile/eboard-profile.component';
import { EditableSocialButtonComponent } from './editable-social-button/editable-social-button.component';
import { InlineOptionsProfileComponent } from './inline-options-profile/inline-options-profile.component';
import { InlineProfileComponent } from './inline-profile/inline-profile.component';
import { ProfileGridComponent } from './profile-grid/profile-grid.component';
import { ProfileOverlayComponent } from './profile-overlay/profile-overlay.component';
import { SocialButtonComponent } from './social-button/social-button.component';
import { UserInputComponent } from './user-input/user-input.component';
import { UsersDisplayComponent } from './users-display/users-display.component';

@NgModule({
  declarations: [
    BasicProfileComponent,
    ProfileGridComponent,
    EditableSocialButtonComponent,
    SocialButtonComponent,
    UsersDisplayComponent,
    UserInputComponent,
    InlineProfileComponent,
    InlineOptionsProfileComponent,
    EboardProfileComponent,
    ProfileOverlayComponent,
  ],
  imports: [
    CommonModule,
    AvatarModule,
    FilteringModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    IconModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    RouterModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    ServicesModule,
    RolesModule,
    TagsModule,
    OverlayModule,
    ButtonStylesModule,
    A11yModule,
  ],
  exports: [
    BasicProfileComponent,
    ProfileGridComponent,
    EditableSocialButtonComponent,
    SocialButtonComponent,
    UsersDisplayComponent,
    UserInputComponent,
    InlineProfileComponent,
    InlineOptionsProfileComponent,
    EboardProfileComponent,
    ProfileOverlayComponent,
  ],
})
export class UserModule {}
