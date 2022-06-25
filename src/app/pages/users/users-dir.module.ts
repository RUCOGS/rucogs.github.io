import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const ROUTES: Route[] = [
  { path: '', loadChildren: () => import('./users-page/users-page.module').then(m => m.UsersPageModule) },
  { path: ':username', loadChildren: () => import('./user-page/user-page.module').then(m => m.UserPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
  ],
})
export class UsersDirModule { }
