import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesModule } from './articles/articles.module';
import { BlogModule } from './blog/blog.module';
import { CalendarModule } from './calendar/calendar.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { PicturesModule } from './pictures/pictures.module';
import { ResourceModule } from '../modules/resource/resource.module';
import { ScarletGameJamModule } from './scarlet-game-jam/scarlet-game-jam.module';
import { SignupModule } from './signup/signup.module';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ArticlesModule,
    BlogModule,
    CalendarModule,
    HomeModule,
    LoginModule,
    PicturesModule,
    ResourceModule,
    ScarletGameJamModule,
    SignupModule,
    UserModule,
    UsersModule
  ],
  exports: [
    ArticlesModule,
    BlogModule,
    CalendarModule,
    HomeModule,
    LoginModule,
    PicturesModule,
    ResourceModule,
    ScarletGameJamModule,
    SignupModule,
    UserModule,
    UsersModule
  ],
})
export class PagesModule { }
