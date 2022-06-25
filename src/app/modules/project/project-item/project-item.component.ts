import { Component, Input, OnInit } from '@angular/core';
import { AccessOptions } from '../_classes/access-options';
import { CdnService } from '@src/app/services/cdn.service';
import { Maybe, Project } from '@src/generated/graphql-endpoint.types';
import { SettingsService } from '@src/_settings';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {

  @Input() project: Partial<Project> = {};

  accessOptions = AccessOptions;

  constructor(
    private cdnService: CdnService,
    private settings: SettingsService
  ) { }

  ngOnInit(): void {
  }

  getCardImage() {
    if (!this.project.cardImageLink)
      return this.settings.General.defaultCardImageSrc;
    const link = this.cdnService.getFileLink(this.project.cardImageLink);
    return link;
  }

  getProjectYear() {
    return new Date(this.project.createdAt).getFullYear()
  }

  getProjectCompleted() {
    return this.project.completedAt != undefined;
  }

  getProjectLink() {
    return `/projects/${this.project.id}`;
  }

  getAvatarLinks() {
    if (!this.project.members)
      return [];
    return this.project.members.map(x => this.cdnService.getFileLink(x.user.avatarLink));
  }
}
