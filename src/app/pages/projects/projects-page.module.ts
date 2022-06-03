import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsPageComponent } from './projects/projects-page.component';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { ProjectModule } from '@src/app/modules/project/project.module';

export { ProjectsPageComponent };


@NgModule({
  declarations: [
    ProjectsPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ProjectModule,
  ],
  exports: [
    ProjectsPageComponent
  ]
})
export class ProjectsPageModule { }
