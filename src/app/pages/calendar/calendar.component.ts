import { Component, OnInit } from '@angular/core';
import { BreakpointManagerService } from '@app/services/breakpoint-manager.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
  host: {
    class: 'page'
  }
})
export class CalendarComponent implements OnInit {

  constructor(public breakpointManager: BreakpointManagerService) { }

  ngOnInit(): void {
  }

}
