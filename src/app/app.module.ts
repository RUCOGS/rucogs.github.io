import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ButtonComponent } from './components/button/button.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatButtonModule } from '@angular/material/button';
import { HomeComponent } from '@pages/home/home.component';
import { CalendarComponent } from '@pages/calendar/calendar.component';
import { ProjectsComponent } from '@pages/projects/projects.component';
import { PicturesComponent } from '@pages/pictures/pictures.component';
import { ResourcesComponent } from '@pages/resources/resources.component';
import { ScarletGameJamComponent } from '@pages/scarlet-game-jam/scarlet-game-jam.component';
import { CardComponent } from '@components/cards/card/card.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'pictures', component: PicturesComponent },
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
    CardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatButtonModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
