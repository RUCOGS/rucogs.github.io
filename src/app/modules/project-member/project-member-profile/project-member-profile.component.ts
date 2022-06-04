import { Component, Input, OnInit } from '@angular/core';
import { CdnService } from '@src/app/services/cdn.service';
import { ProjectMember } from '@src/generated/graphql-endpoint.types';
import { PartialDeep } from 'type-fest';

@Component({
  selector: 'app-project-member-profile',
  templateUrl: './project-member-profile.component.html',
  styleUrls: ['./project-member-profile.component.css']
})
export class ProjectMemberProfileComponent implements OnInit {
  @Input() projectMember: PartialDeep<ProjectMember> = {};

  constructor(
    public cdn: CdnService
  ) { }

  ngOnInit(): void {
  }
  
  getRoles() {
    return this.projectMember.roles?.map(x => x!.roleCode!) ?? [];
  }
}
