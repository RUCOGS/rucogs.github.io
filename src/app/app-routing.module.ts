import { NgModule } from '@angular/core';
import { RouterModule, Routes, UrlSegment } from '@angular/router';
import { ArticlePageComponent, BlogPageComponent, CalendarPageComponent, HomePageComponent, LoginPageComponent, PicturesPageComponent, ProjectsPageComponent, ResourcesPageComponent, ScarletGameJamPageComponent, SignupPageComponent, UserPageComponent, UsersPageComponent } from '@app/pages/pages.module';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'calendar', component: CalendarPageComponent },
  { path: 'projects', component: ProjectsPageComponent },
  { path: 'pictures', component: PicturesPageComponent },
  { path: 'resources', component: ResourcesPageComponent },
  { path: 'scarlet-game-jam', component: ScarletGameJamPageComponent },
  { path: 'blog', component: BlogPageComponent },
  { 
    matcher: (url: UrlSegment[]) => {
      if (url.length > 1 && url[0].path === "blog") {
        return {
          consumed: url,
          posParams: {
            article: new UrlSegment(url.slice(1).join("/"), {})
          }
        };
      }
      return null;
    }, component: ArticlePageComponent 
  },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'users/:username', component: UserPageComponent },
  { path: 'users', component: UsersPageComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled' 
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
