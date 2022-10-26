import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';

const ROUTES: Route[] = [
  {
    path: '',
    component: CalendarPageComponent,
    data: {
      title: 'Calendar',
    },
  },
];

@NgModule({
  declarations: [CalendarPageComponent],
  imports: [RouterModule.forChild(ROUTES), CommonModule, CoreModule],
})
export class CalendarPageModule {}
