import { Component, Input, OnInit } from '@angular/core';
import { User } from '@src/generated/graphql-endpoint.types';

@Component({
  selector: 'app-profile-grid',
  templateUrl: './profile-grid.component.html',
  styleUrls: ['./profile-grid.component.css']
})
export class ProfileGridComponent implements OnInit {

  @Input() users: Partial<User>[] = [];

  constructor() {}

  ngOnInit(): void {
  }

  getUserLink(user: Partial<User>) {
    if (user.username) {
      return `/users/${user.username}`;
    }
    return "";
  }
}
