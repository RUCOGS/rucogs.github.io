import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicProfileComponent } from './basic-profile/basic-profile.component';
import { AvatarModule } from '../avatar/avatar.module';
import { ProfileGridComponent } from './profile-grid/profile-grid.component';
import { EditableSocialButtonComponent } from './editable-social-button/editable-social-button.component';
import { SocialButtonComponent } from './social-button/social-button.component';
import { UsersDisplayComponent } from './users-display/users-display.component';
import { FilteringModule } from '../filtering/filtering.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { IconModule } from '@visurel/iconify-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
  declarations: [
    BasicProfileComponent,
    ProfileGridComponent,
    EditableSocialButtonComponent,
    SocialButtonComponent,
    UsersDisplayComponent
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
  ],
  exports: [
    BasicProfileComponent,
    ProfileGridComponent,
    EditableSocialButtonComponent,
    SocialButtonComponent,
    UsersDisplayComponent
  ]
})
export class UserModule { }
