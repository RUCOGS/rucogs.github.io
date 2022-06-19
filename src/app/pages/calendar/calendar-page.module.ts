import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CalendarPageComponent } from './calendar/calendar-page.component';
import { CoreModule } from '@src/app/modules/_core/core.module';

export { CalendarPageComponent };


@NgModule({
  declarations: [
    CalendarPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
  ],
  exports: [
    CalendarPageComponent
  ]
})
export class CalendarPageModule { }
