import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectsDisplayComponent } from './projects-display/projects-display.component';
import { FilteringModule } from '../filtering/filtering.module';



@NgModule({
  declarations: [
    ProjectItemComponent,
    ProjectsDisplayComponent,
  ],
  imports: [
    CommonModule,
    FilteringModule,
  ],
  exports: [
    ProjectItemComponent,
    ProjectsDisplayComponent
  ]
})
export class ProjectModule { }
