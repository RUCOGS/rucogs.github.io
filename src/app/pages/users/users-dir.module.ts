import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const ROUTES: Route[] = [
  { path: ':username', loadChildren: () => import('./user-page/user-page.module').then(m => m.UserPageModule) },
  { path: '', loadChildren: () => import('./users-page/users-page.module').then(m => m.UsersPageModule) },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
  ],
})
export class UsersDirModule { }
