import { AfterViewInit, Component } from '@angular/core';
import { BreakpointManagerService } from '@app/services/breakpoint-manager.service';
import { getSemesterString } from '@src/app/utils/duration-utils';
import { SettingsService } from '@src/_settings';
declare var FlipDown: any;

@Component({
  selector: 'app-global-game-jam-page',
  templateUrl: './global-game-jam-page.component.html',
  styleUrls: ['./global-game-jam-page.component.css'],
  host: {
    class: 'page',
  },
})
export class GlobalGameJamPageComponent implements AfterViewInit {
  startDate: string = 'Feb 3 5:00 pm';

  eventActive: boolean = false;

  signupLink: string = 'https://docs.google.com/forms/d/e/1FAIpQLSdKO4CJxCXNtefgiYBx07Fq03feDFc897z6lLGrEi7wttPRLA/viewform';
  siteLink: string = 'https://globalgamejam.org/2023/jam-sites/rutgers-new-brunswick-creation-games-society';

  constructor(public breakpointManager: BreakpointManagerService, public settings: SettingsService) {}

  getSemesterString = getSemesterString;
  
  ngAfterViewInit(): void {
    if (!this.eventActive) {
      var finalDateSeconds =
        new Date(this.startDate + ', ' + new Date().getFullYear() + ' EST').getTime() / 1000;
      var flipdown = new FlipDown(finalDateSeconds, 'sgj-countdown', {
        theme: 'dark',
      }).start();
    }
  }
}
