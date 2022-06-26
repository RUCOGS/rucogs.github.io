import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home/home-page.component';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { CardsModule } from '@src/app/modules/cards/cards.module';
import { Route, RouterModule } from '@angular/router';

const ROUTES: Route[] = [{ path: '**', component: HomePageComponent }];

@NgModule({
  declarations: [HomePageComponent],
  imports: [RouterModule.forChild(ROUTES), CommonModule, CoreModule, MatExpansionModule, CardsModule],
})
export class HomePageModule {}
