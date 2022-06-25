import { Component } from '@angular/core';
import { BreakpointManagerService } from '@src/app/services/breakpoint-manager.service';

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
      label: 'Members', 
      path: './' 
    },
    { 
      matIcon: 'assignment_ind',
      label: 'E-Board', 
      path: './eboard' 
    }
  ];
  
  constructor(
    public breakpointManager: BreakpointManagerService
  ) {}
}