import { Component, OnInit } from '@angular/core';
import { BreakpointManagerService } from '@app/services/breakpoint-manager.service';

@Component({
  selector: 'app-calendar-page',
  templateUrl: './calendar-page.component.html',
  styleUrls: ['./calendar-page.component.css'],
  host: {
    class: 'page',
  },
})
export class CalendarPageComponent implements OnInit {
  constructor(public breakpointManager: BreakpointManagerService) {}

  ngOnInit(): void {}
}
