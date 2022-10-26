import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { Route, RouterModule } from '@angular/router';
import { ProjectModule } from '@src/app/modules/project/project.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { ProjectsPageComponent } from './projects-page/projects-page.component';

const ROUTES: Route[] = [
  {
    path: '',
    component: ProjectsPageComponent,
    data: { titleAll: 'Projects' },
  },
];

@NgModule({
  declarations: [ProjectsPageComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    CoreModule,
    ProjectModule,
    CoreModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    MatRadioModule,
    MatIconModule,
  ],
})
export class ProjectsPageModule {}
