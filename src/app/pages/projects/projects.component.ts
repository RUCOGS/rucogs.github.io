import { Component, OnInit } from '@angular/core';
import { Project } from '@src/generated/graphql-endpoint.types';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Partial<Project>[] = []

  constructor() { }

  ngOnInit(): void {
    // TODO NOW
  }
}
