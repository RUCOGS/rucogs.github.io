import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { Route, RouterModule } from '@angular/router';
import { CardsModule } from '@src/app/modules/cards/cards.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { SEOUpdateData } from '@src/app/services/seo.service';
import { IconModule } from '@visurel/iconify-angular';
import { ScarletShowcasePageComponent } from './scarlet-showcase/scarlet-showcase-page.component';

export { ScarletShowcasePageComponent };

const ROUTES: Route[] = [
  {
    path: '',
    component: ScarletShowcasePageComponent,
    data: {
      titleAll: 'Scarlet Showcase',
      description:
        'Come checkout creative works made by COGS, RUCVGM, VANCE, Animation Club, and Digital Art Club! Participate in fun activities, win prizes, and buy merch.',
      twitterCard: 'summary_large_image',
      ogImage: 'assets/images/sgj-summary-banner-f2022.png',
    } as SEOUpdateData,
  },
];

@NgModule({
  declarations: [ScarletShowcasePageComponent],
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
export class ScarletShowcasePageModule {}
