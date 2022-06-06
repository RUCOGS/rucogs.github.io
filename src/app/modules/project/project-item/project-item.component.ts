import { Component, Input, OnInit } from '@angular/core';
import { CdnService } from '@src/app/services/cdn.service';
import { Maybe, Project } from '@src/generated/graphql-endpoint.types';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {

  @Input() project: Partial<Project> = {};

  constructor(
    private cdnService: CdnService
  ) { }

  ngOnInit(): void {
  }

  getFileLink(filePath: string | undefined | null) {
    if (!filePath)
      return "";
    const link = this.cdnService.getFileLink(filePath);
    return link;
  }

  getProjectYear() {
    return new Date(this.project.createdAt).getFullYear()
  }

  getProjectCompleted() {
    return this.project.completedAt !== undefined;
  }

  getProjectLink() {
    return `/projects/${this.project.id}`;
  }

  getAvatarLinks() {
    if (!this.project.members)
      return [];
    return this.project.members.map(x => x.user.avatarLink ?? "");
  }
}
