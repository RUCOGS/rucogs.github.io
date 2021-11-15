import { Component, OnInit } from '@angular/core';
import { ProjectManagerService } from '@app/services/project-manager.service';
import { Project } from '@app/utils/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css'],
  host: {
    class: 'page'
  }
})
export class ProjectsComponent implements OnInit {

  constructor(private projectManager: ProjectManagerService) { }

  projects: Project[] = [];

  ngOnInit(): void {
    this.projectManager.getProjects().subscribe((x) => this.projects = x);
  }
}
