import { AfterViewInit, Component } from '@angular/core';
import { BreakpointManagerService } from '@app/services/breakpoint-manager.service';
import { convertHourMinute12to24, getSemesterString } from '@src/app/utils/duration-utils';
import { SettingsService } from '@src/_settings';
declare var FlipDown: any;

@Component({
  selector: 'app-scarlet-showcase-page',
  templateUrl: './scarlet-showcase-page.component.html',
  styleUrls: ['./scarlet-showcase-page.component.css'],
  host: {
    class: 'page',
  },
})
export class ScarletShowcasePageComponent implements AfterViewInit {
  startDate: string = 'Dec 8';
  startTime: string = '5:00 pm';

  eventActive: boolean = false;

  eventPage: string = 'https://rutgers.campuslabs.com/engage/event/10744395';

  constructor(public breakpointManager: BreakpointManagerService, public settings: SettingsService) {}

  getSemesterString = getSemesterString;

  ngAfterViewInit(): void {
    let startTime24Hr = convertHourMinute12to24(this.startTime);
    if (!this.eventActive) {
      var finalDateSeconds =
        new Date(this.startDate + ', ' + new Date().getFullYear() + ' ' + startTime24Hr + ' EST').getTime() / 1000;
      console.log('using file seconds: ', finalDateSeconds);
      var flipdown = new FlipDown(finalDateSeconds, 'sgj-countdown', {
        theme: 'dark',
      }).start();
    }
  }
}
