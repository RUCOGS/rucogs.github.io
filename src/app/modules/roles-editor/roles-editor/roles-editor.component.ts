import { Component, Input, OnInit } from '@angular/core';
import { RoleEdit } from '../role-edit-item/role-edit-item.component';

@Component({
  selector: 'app-roles-editor',
  templateUrl: './roles-editor.component.html',
  styleUrls: ['./roles-editor.component.css']
})
export class RolesEditorComponent implements OnInit {

  @Input() roleEdits: RoleEdit[] = []

  constructor() { }

  ngOnInit(): void {
  }

}
