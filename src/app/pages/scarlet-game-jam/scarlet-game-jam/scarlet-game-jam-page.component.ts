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
  startDate: string = 'Nov 12';
  endDate: string = 'Nov 17';

  startDateTime: string = '4pm - 8pm';
  endDateTime: string = '3pm - 9pm';

  merchLink: string = 'http://scarlet-game-jam.allcolorsllc.com/';
  signupLink: string = 'https://forms.gle/ZMKend3JweRqRFcq9';
  itchioLink: string = 'https://itch.io/jam/scarlet-game-jam-fall-2023';
  stickerPinDesignLink: string = 'https://forms.gle/2Kp8yfb3eDQJDz1CA';

  startDateEventPage: string = 'https://rutgers.campuslabs.com/engage/event/9008349';
  endDateEventPage: string = 'https://rutgers.campuslabs.com/engage/event/9008349';

  eventActive: boolean = false;

  constructor(public breakpointManager: BreakpointManagerService, public settings: SettingsService) {}

  getSemesterString = getSemesterString;

  ngOnInit(): void {
    let startDateTimeStart = convertHourMinute12to24(this.startDateTime.split('-')[0]);
    let startDateObj = new Date(this.startDate + ', ' + new Date().getFullYear() + ' ' + startDateTimeStart + ' EST');
    this.eventActive = startDateObj < new Date();
    let finalDateSeconds = startDateObj.getTime() / 1000;

    if (!this.eventActive) {
      let flipdown = new FlipDown(finalDateSeconds, 'sgj-countdown', {
        theme: 'dark',
      }).start();
    }
  }
}
