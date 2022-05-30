import { Component, Input, OnInit } from '@angular/core';
import { Permission } from '@src/generated/graphql-endpoint.types';

export class RoleEdit {
  constructor(
    public role: Permission,
    public roleEditItemComponent?: RoleEditItemComponent,
  ) {}
}

@Component({
  selector: 'app-role-edit-item',
  templateUrl: './role-edit-item.component.html',
  styleUrls: ['./role-edit-item.component.css']
})
export class RoleEditItemComponent implements OnInit {

  @Input() roleEdit: RoleEdit = new RoleEdit(Permission.CreateProject);

  constructor() { }

  ngOnInit(): void {
    
  }

}
