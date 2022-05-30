import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleItemComponent } from './role-item/role-item.component';
import { RolesEditorComponent } from './roles-editor/roles-editor.component';
import { RoleEditItemComponent } from './role-edit-item/role-edit-item.component';

@NgModule({
  declarations: [
    RoleItemComponent,
    RolesEditorComponent,
    RoleEditItemComponent
  ],
  imports: [
    CommonModule
  ]
})
export class RolesEditorModule { }
