import { NgModule } from '@angular/core';

import { Route, RouterModule } from '@angular/router';

const routes: Route[] = [
  { path: 'home', loadChildren: () => import('./home/home-page.module').then((m) => m.HomePageModule) },
  { path: 'calendar', loadChildren: () => import('./calendar/calendar-page.module').then((m) => m.CalendarPageModule) },
  { path: 'projects', loadChildren: () => import('./projects/projects-dir.module').then((m) => m.ProjectsDirModule) },
  {
    path: 'pictures',
    loadChildren: () => import('./pictures//pictures-page.module').then((m) => m.PicturesPageModule),
  },
  {
    path: 'resources',
    loadChildren: () => import('./resources/resources-page.module').then((m) => m.ResourcesPageModule),
  },
  {
    path: 'sgj',
    redirectTo: 'scarlet-game-jam',
  },
  {
    path: 'scarlet-game-jam',
    loadChildren: () =>
      import('./scarlet-game-jam/scarlet-game-jam-page.module').then((m) => m.ScarletGameJamPageModule),
  },
  { path: 'blog', loadChildren: () => import('./blog/blog-dir.module').then((m) => m.BlogDirModule) },
  { path: 'login', loadChildren: () => import('./login/login-page.module').then((m) => m.LoginPageModule) },
  { path: 'signup', loadChildren: () => import('./signup/signup-page.module').then((m) => m.SignupPageModule) },
  { path: 'members', loadChildren: () => import('./users/users-dir.module').then((m) => m.UsersDirModule) },
  { path: 'test', loadChildren: () => import('./test/test.module').then((m) => m.TestPageModule) },

  { path: 'result', loadChildren: () => import('./result/result-page.module').then((m) => m.ResultModule) },

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class PagesModule {}
