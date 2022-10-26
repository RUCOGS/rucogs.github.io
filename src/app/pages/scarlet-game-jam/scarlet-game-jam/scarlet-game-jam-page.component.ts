import { Component, OnInit } from '@angular/core';
import { BreakpointManagerService } from '@app/services/breakpoint-manager.service';
import { getSemesterString } from '@src/app/utils/duration-utils';
import { SettingsService } from '@src/_settings';
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
  startDate: string = 'Nov 13';
  endDate: string = 'Nov 20';

  eventActive: boolean = false;

  merchLink: string = 'http://scarlet-game-jam.allcolorsllc.com/';
  signupLink: string = 'https://forms.gle/3QT1gDhXqUGdvhhn6';
  itchioLink: string = 'https://itch.io/jam/scarlet-game-jam-fall-2022';

  startDateTime: string = '4pm - 6pm';
  endDateTime: string = '11am - 11pm';

  startDateEventPage: string = 'https://rutgers.campuslabs.com/engage/event/8543685';
  endDateEventPage: string = 'https://rutgers.campuslabs.com/engage/event/8543686';

  constructor(public breakpointManager: BreakpointManagerService, public settings: SettingsService) {}

  getSemesterString = getSemesterString;

  ngOnInit(): void {
    if (!this.eventActive) {
      var finalDateSeconds =
        new Date(this.startDate + ', ' + new Date().getFullYear() + ' 16:00:00 EST').getTime() / 1000;
      var flipdown = new FlipDown(finalDateSeconds, 'sgj-countdown', {
        theme: 'dark',
      }).start();
    }
  }
}
