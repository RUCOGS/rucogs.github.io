import { Component, Input, OnInit } from '@angular/core';
import { Project } from '@src/generated/graphql-endpoint.types';

@Component({
  selector: 'app-project-item',
  templateUrl: './project-item.component.html',
  styleUrls: ['./project-item.component.css']
})
export class ProjectItemComponent implements OnInit {

  @Input() project: Partial<Project> = {};

  constructor() { }

  ngOnInit(): void {
  }
}
