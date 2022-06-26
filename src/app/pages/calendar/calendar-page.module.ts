import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarPageComponent } from './calendar-page/calendar-page.component';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { Route, RouterModule } from '@angular/router';
import { ServicesModule } from '@src/app/services/_services.module';

const ROUTES: Route[] = [{ path: '', component: CalendarPageComponent }];

@NgModule({
  declarations: [CalendarPageComponent],
  imports: [RouterModule.forChild(ROUTES), CommonModule, CoreModule],
})
export class CalendarPageModule {}
