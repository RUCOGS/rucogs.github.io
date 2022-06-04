import { Component, Input, OnInit } from '@angular/core';
import { ProjectMember } from '@src/generated/graphql-endpoint.types';
import { PartialDeep } from 'type-fest';

@Component({
  selector: 'app-project-members-display',
  templateUrl: './project-members-display.component.html',
  styleUrls: ['./project-members-display.component.css']
})
export class ProjectMembersDisplayComponent implements OnInit {

  @Input() projectMembers: PartialDeep<ProjectMember>[] = [];

  constructor() { }

  ngOnInit(): void {
    
  }

}
