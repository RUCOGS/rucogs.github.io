import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { GraphQLModule } from './modules/graphql/graphql.module';
import { IconModule } from '@visurel/iconify-angular';

import { PagesModule } from './pages/pages.module';
import { SiteMenusModule } from './modules/site-menus/site-menus.module';
import { ServicesModule } from './services/_services.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    HttpClientModule,
    PagesModule,
    SiteMenusModule,
    ServicesModule,
    MarkdownModule.forRoot({
      sanitize: SecurityContext.NONE
    }),
    GraphQLModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }