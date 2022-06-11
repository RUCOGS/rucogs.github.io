import { Component, OnInit } from '@angular/core';
import { Project } from '@src/generated/graphql-endpoint.types';

@Component({
  selector: 'app-projects-page',
  templateUrl: './projects-page.component.html',
  styleUrls: ['./projects-page.component.css']
})
export class ProjectsPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    
  }
}
