import { Component, OnInit } from '@angular/core';
import { BreakpointManagerService } from '@app/services/breakpoint-manager.service';
import { SettingsService } from '@src/_settings';
import { convertHourMinute12to24, getSemesterString } from '@src/app/utils/duration-utils';
declare var FlipDown: any;

@Component({
  selector: 'app-scarlet-game-jam-page',
  templateUrl: './scarlet-game-jam-page.component.html',
  styleUrls: ['./scarlet-game-jam-page.component.css'],
  host: {
    class: 'page',
  },
})
export class ScarletGameJamPageComponent implements OnInit {
  startDate: string = 'Apr 16';
  endDate: string = 'Apr 21';

  startDateTime: string = '4pm - 8pm';
  endDateTime: string = '3pm - 9pm';

  eventActive: boolean = false;

  merchLink: string = 'http://scarlet-game-jam.allcolorsllc.com/';
  signupLink: string = '';
  itchioLink: string = '';

  startDateEventPage: string = '';
  endDateEventPage: string = '';

  constructor(public breakpointManager: BreakpointManagerService, public settings: SettingsService) {}

  getSemesterString = getSemesterString;

  ngOnInit(): void {
    if (!this.eventActive) {
      let startDateTimeStart = convertHourMinute12to24(this.startDateTime.split('-')[0]);
      console.log(startDateTimeStart);
      let finalDateSeconds =
        new Date(this.startDate + ', ' + new Date().getFullYear() + ' ' + startDateTimeStart + ' EST').getTime() / 1000;
      let flipdown = new FlipDown(finalDateSeconds, 'sgj-countdown', {
        theme: 'dark',
      }).start();
    }
  }
}
