import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { DiscordComponent } from './discord/discord.component';

const ROUTES: Route[] = [
  {
    path: '',
    component: DiscordComponent,
    data: {
      title: 'Discord',
    },
  },
];

@NgModule({
  declarations: [DiscordComponent],
  imports: [RouterModule.forChild(ROUTES), CommonModule, CoreModule],
})
export class DiscordPageModule {}
