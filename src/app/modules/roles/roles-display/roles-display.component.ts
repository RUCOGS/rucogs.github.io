import { Component, Input, OnInit } from '@angular/core';
import { RoleCode } from '@src/generated/graphql-endpoint.types';
import { RoleData } from '@src/shared/security';

@Component({
  selector: 'app-roles-display',
  templateUrl: './roles-display.component.html',
  styleUrls: ['./roles-display.component.css']
})
export class RolesDisplayComponent implements OnInit {
  @Input() roles: RoleCode[] = []
  
  constructor() { }

  ngOnInit(): void {
  }

  getRoleData(roleCode: RoleCode) {
    return RoleData[roleCode];
  }
}
