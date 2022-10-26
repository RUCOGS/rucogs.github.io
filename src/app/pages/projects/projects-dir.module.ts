import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const ROUTES: Route[] = [
  {
    path: 'new',
    loadChildren: () => import('./new-project-page/new-project-page.module').then((m) => m.NewProjectPageModule),
    data: {
      title: 'New Project',
    },
  },
  {
    path: ':projectId',
    loadChildren: () => import('./project-page/project-page.module').then((m) => m.ProjectPageModule),
  },
  { path: '', loadChildren: () => import('./projects-page/projects-page.module').then((m) => m.ProjectsPageModule) },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES), CommonModule],
})
export class ProjectsDirModule {}
