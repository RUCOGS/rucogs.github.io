import { Component } from '@angular/core';

@Component({
  selector: 'app-users-page',
  templateUrl: './users-page.component.html',
  styleUrls: ['./users-page.component.css']
})
export class UsersPageComponent {
  usersTabs: {
    matIcon: string, 
    label: string, 
    path: string 
  }[] = [
    { 
      matIcon: 'person',
      label: 'Users', 
      path: './' 
    },
    { 
      matIcon: 'assignment_ind',
      label: 'E-Board', 
      path: './eboard' 
    }
  ];
}