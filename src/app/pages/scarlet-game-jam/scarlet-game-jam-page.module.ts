import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { Route, RouterModule } from '@angular/router';
import { CardsModule } from '@src/app/modules/cards/cards.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { IconModule } from '@visurel/iconify-angular';
import { ScarletGameJamPageComponent } from './scarlet-game-jam/scarlet-game-jam-page.component';

export { ScarletGameJamPageComponent };

const ROUTES: Route[] = [{ path: '', component: ScarletGameJamPageComponent }];

@NgModule({
  declarations: [ScarletGameJamPageComponent],
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
export class ScarletGameJamPageModule {}
