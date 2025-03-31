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
  startDate: string = 'Apr 8';
  endDate: string = 'Apr 12';

  startDateTime: string = '7pm - 9pm';
  endDateTime: string = '1pm - 10pm';

  merchLink: string = 'http://scarlet-game-jam.allcolorsllc.com/';
  signupLink: string = 'https://forms.gle/2AMGdrM8mtG4TGvR7'; //done
  itchioLink: string = 'about://blank';
  stickerPinDesignLink: string = 'https://forms.gle/2Kp8yfb3eDQJDz1CA';

  startDateEventPage: string = 'https://rutgers.campuslabs.com/engage/event/11213887';
  endDateEventPage: string = 'https://rutgers.campuslabs.com/engage/event/11213887';

  eventActive: boolean = false;

  constructor(public breakpointManager: BreakpointManagerService, public settings: SettingsService) {}

  getSemesterString = getSemesterString;

  ngOnInit(): void {
    let startDateTime24Hr = convertHourMinute12to24(this.startDateTime.split('-')[0]);
    let startDateObj = new Date(this.startDate + ', ' + new Date().getFullYear() + ' ' + startDateTime24Hr + ' EST');
    this.eventActive = startDateObj < new Date();
    let finalDateSeconds = startDateObj.getTime() / 1000;

    if (!this.eventActive) {
      let flipdown = new FlipDown(finalDateSeconds, 'sgj-countdown', {
        theme: 'dark',
      }).start();
    }
  }
}
