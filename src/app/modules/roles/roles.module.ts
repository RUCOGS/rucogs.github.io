import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleCodesEditorComponent } from './role-codes-editor/role-codes-editor.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatOptionModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RolesDisplayComponent } from './roles-display/roles-display.component';
import { TagsModule } from '@app/modules/tags/tags.module';

@NgModule({
  declarations: [
    RoleCodesEditorComponent,
    RolesDisplayComponent,
  ],
  imports: [
    CommonModule,
    MatChipsModule,
    MatOptionModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    TagsModule,
  ],
  exports: [
    RoleCodesEditorComponent,
    RolesDisplayComponent
  ]
})
export class RolesModule { }
