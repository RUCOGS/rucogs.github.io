import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Route, RouterModule } from '@angular/router';
import { ButtonStylesModule } from '@src/app/modules/button-styles/button-styles.module';
import { CardsModule } from '@src/app/modules/cards/cards.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { ResultPageComponent } from './result-page/result-page.component';

const ROUTES: Route[] = [{ path: '', component: ResultPageComponent }];

@NgModule({
  declarations: [ResultPageComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    CoreModule,
    CommonModule,
    CardsModule,
    ButtonStylesModule,
    MatButtonModule,
    MatIconModule,
  ],
})
export class ResultModule {}
