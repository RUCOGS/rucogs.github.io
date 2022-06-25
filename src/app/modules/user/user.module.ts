import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicProfileComponent } from './basic-profile/basic-profile.component';
import { AvatarModule } from '../avatar/avatar.module';
import { ProfileGridComponent } from './profile-grid/profile-grid.component';
import { EditableSocialButtonComponent } from './editable-social-button/editable-social-button.component';
import { SocialButtonComponent } from './social-button/social-button.component';
import { UsersDisplayComponent } from './users-display/users-display.component';
import { FilteringModule } from '@app/modules/filtering/filtering.module';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { UserInputComponent } from './user-input/user-input.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { InlineProfileComponent } from './inline-profile/inline-profile.component';
import { InlineOptionsProfileComponent } from './inline-options-profile/inline-options-profile.component';
import { ServicesModule } from '@src/app/services/_services.module';
import { EboardProfileComponent } from './eboard-profile/eboard-profile.component';
import { RolesModule } from '../roles/roles.module';
import { TagsModule } from '../tags/tags.module';



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
    TagsModule
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
    EboardProfileComponent
  ]
})
export class UserModule { }
