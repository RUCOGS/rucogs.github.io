import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticlePageModule } from './article/article-page.module';
import { BlogPageModule } from './blog/blog-page.module';
import { CalendarPageModule } from './calendar/calendar-page.module';
import { HomePageModule } from './home/home-page.module';
import { LoginPageModule } from './login/login-page.module';
import { PicturesPageModule } from './pictures/pictures-page.module';
import { ResourcesPageModule } from './resources/resources-page.module';
import { ScarletGameJamPageModule } from './scarlet-game-jam/scarlet-game-jam-page.module';
import { SignupPageModule } from './signup/signup-page.module';
import { UserPageModule } from './user/user-page.module';
import { UsersPageModule } from './users/users-page.module';
import { ProjectsPageModule } from './projects/projects-page.module';
import { ProjectPageModule } from './project/project-page.module';
import { TestPageModule } from './test/test-page.module';

export * from './article/article-page.module';
export * from './blog/blog-page.module';
export * from './calendar/calendar-page.module';
export * from './home/home-page.module';
export * from './login/login-page.module';
export * from './pictures/pictures-page.module';
export * from './resources/resources-page.module';
export * from './scarlet-game-jam/scarlet-game-jam-page.module';
export * from './signup/signup-page.module';
export * from './user/user-page.module';
export * from './users/users-page.module';
export * from './projects/projects-page.module';
export * from './project/project-page.module';
export * from './test/test-page.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ArticlePageModule,
    BlogPageModule,
    CalendarPageModule,
    HomePageModule,
    LoginPageModule,
    PicturesPageModule,
    ResourcesPageModule,
    ScarletGameJamPageModule,
    SignupPageModule,
    UserPageModule,
    UsersPageModule,
    ProjectsPageModule,
    TestPageModule,
  ],
  exports: [
    ArticlePageModule,
    BlogPageModule,
    CalendarPageModule,
    HomePageModule,
    LoginPageModule,
    PicturesPageModule,
    ResourcesPageModule,
    ScarletGameJamPageModule,
    SignupPageModule,
    UserPageModule,
    UsersPageModule,
    ProjectsPageModule,
    ProjectPageModule,
    TestPageModule
  ],
})
export class PagesModule { }
