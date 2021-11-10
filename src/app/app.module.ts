import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { HomeComponent } from '@pages/home/home.component';
import { CalendarComponent } from '@pages/calendar/calendar.component';
import { ProjectsComponent } from '@pages/projects/projects.component';
import { PicturesComponent } from '@pages/pictures/pictures.component';
import { ResourcesComponent } from '@pages/resources/resources.component';
import { ScarletGameJamComponent } from '@pages/scarlet-game-jam/scarlet-game-jam.component';
import { CardComponent } from '@components/cards/card/card.component';
import { CardGridComponent } from '@components/card-grid/card-grid.component';
import { SectionComponent } from '@components/section/section.component';
import { DogEarDirective } from '@directives/dog-ear/dog-ear.directive';
import { PageHeaderComponent } from './components/page-header/page-header.component';
import { FullPageHeaderComponent } from './components/full-page-header/full-page-header.component';
import { SiteHeaderComponent } from './components/site-header/site-header.component';
import { SiteFooterComponent } from './components/site-footer/site-footer.component';
import { HorizontalMenuComponent } from './components/horizontal-menu/horizontal-menu.component';
import { HamburgerMenuComponent } from './components/hamburger-menu/hamburger-menu.component';
import { HorizontalMenuButtonComponent } from './components/horizontal-menu-button/horizontal-menu-button.component';
import { BgContainerComponent } from './components/bg-container/bg-container.component'

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'pictures', component: PicturesComponent },
  { path: 'resources', component: ResourcesComponent },
  { path: 'scarlet-game-jam', component: ScarletGameJamComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    AppComponent,
    ButtonComponent,
    HomeComponent,
    CalendarComponent,
    ProjectsComponent,
    PicturesComponent,
    ResourcesComponent,
    ScarletGameJamComponent,
    CardComponent,
    CardGridComponent,
    SectionComponent,
    DogEarDirective,
    PageHeaderComponent,
    FullPageHeaderComponent,
    SiteHeaderComponent,
    SiteFooterComponent,
    HorizontalMenuComponent,
    HamburgerMenuComponent,
    HorizontalMenuButtonComponent,
    BgContainerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
