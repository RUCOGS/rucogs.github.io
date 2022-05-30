import { NgModule } from '@angular/core';
import { Route, RouterModule, Routes, UrlMatchResult, UrlSegment, UrlSegmentGroup } from '@angular/router';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { HomeComponent } from './pages/home/home.component';
import { PicturesComponent } from './pages/pictures/pictures.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { ResourcesComponent } from './pages/resources/resources.component';
import { ScarletGameJamComponent } from './pages/scarlet-game-jam/scarlet-game-jam.component';
import { ArticlesComponent } from './pages/articles/articles.component';
import { BlogComponent } from './pages/blog/blog.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/user/user.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'pictures', component: PicturesComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'scarlet-game-jam', component: ScarletGameJamComponent },
  { path: 'blog', component: BlogComponent },
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
    }, component: ArticlesComponent 
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'users/:username', component: UserComponent },
  { path: 'users', component: UsersComponent },
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
