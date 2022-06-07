import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScarletGameJamPageComponent } from './scarlet-game-jam/scarlet-game-jam-page.component';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardsModule } from '@src/app/modules/cards/cards.module';
import { ResourceModule } from '@src/app/modules/resource/resource.module';
import { MatButtonModule } from '@angular/material/button';
import { IconModule } from '@visurel/iconify-angular';

export { ScarletGameJamPageComponent };


@NgModule({
  declarations: [
    ScarletGameJamPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    MatExpansionModule,
    CardsModule,
    MatButtonModule,
    IconModule,
  ],
  exports: [
    ScarletGameJamPageComponent
  ]
})
export class ScarletGameJamPageModule { }
