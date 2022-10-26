import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Route, RouterModule } from '@angular/router';
import { CardsModule } from '@src/app/modules/cards/cards.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { SEOUpdateData } from '@src/app/services/seo.service';
import { HomePageComponent } from './home/home-page.component';

const ROUTES: Route[] = [
  {
    path: '**',
    component: HomePageComponent,
    data: {
      title: 'COGS',
      ogTitle: 'Creation of Games Society',
      descriptionAll:
        "We're the Creation of Games Society, a game-development club at Rutgers University. Running since 2012, we welcome anyone from any background -- no experience is required!",
      ogImage: 'assets/images/banner.png',
    } as SEOUpdateData,
  },
];

@NgModule({
  declarations: [HomePageComponent],
  imports: [RouterModule.forChild(ROUTES), CommonModule, CoreModule, MatExpansionModule, CardsModule],
})
export class HomePageModule {}
