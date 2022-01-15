import { Component, OnInit } from '@angular/core';
import { ProjectManagerService } from '@app/services/project-manager.service';
import { Project } from '@app/utils/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = []

  constructor(private projectManager: ProjectManagerService) { }

  ngOnInit(): void {
    this.projectManager.getProjects().subscribe((x) => {
      this.projects = x;
    });
  }
}
