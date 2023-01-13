import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { Route, RouterModule } from '@angular/router';
import { CardsModule } from '@src/app/modules/cards/cards.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { SEOUpdateData } from '@src/app/services/seo.service';
import { IconModule } from '@visurel/iconify-angular';
import { GlobalGameJamPageComponent } from './global-game-jam/global-game-jam-page.component';

export { GlobalGameJamPageComponent };

const ROUTES: Route[] = [
  {
    path: '',
    component: GlobalGameJamPageComponent,
    data: {
      titleAll: 'Global Game Jam',
      description:
        'Come make a game with friends in a week. Programmers, artists, and musicians are welcomed, and no experience is required! Global Game Jam is hosted by the Creation of Games Society at Rutgers, and is a week long event.',
      twitterCard: 'summary_large_image',
      ogImage: 'assets/images/sgj-summary-banner-f2022.png',
    } as SEOUpdateData,
  },
];

@NgModule({
  declarations: [GlobalGameJamPageComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    CoreModule,
    MatExpansionModule,
    CardsModule,
    MatButtonModule,
    IconModule,
  ],
})
export class GlobalGameJamPageModule {}
