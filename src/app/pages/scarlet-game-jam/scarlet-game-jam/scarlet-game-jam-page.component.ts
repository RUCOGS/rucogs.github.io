import { Component, OnInit } from '@angular/core';
import { BreakpointManagerService } from '@app/services/breakpoint-manager.service';
import { SettingsService } from '@src/_settings';
declare var FlipDown: any;

@Component({
  selector: 'app-scarlet-game-jam-page',
  templateUrl: './scarlet-game-jam-page.component.html',
  styleUrls: ['./scarlet-game-jam-page.component.css'],
  host: {
    class: 'page'
  }
})
export class ScarletGameJamPageComponent implements OnInit {

  startDate: string = "April 10";
  endDate: string = "April 17";
  startDateCalendarEventLink: string = "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20211110T000000Z%2F20211110T020000Z&details=Meetup%20before%20Scarlet%20Game%20Jam%20to%20meet%20those%20participating%2C%20talk%20about%20your%20ideas%2C%20and%20get%20hyped%21&location=The%20CAVE%20-%20Hill%20250&text=Scarlet%20Game%20Jam%20Meetup%20and%20Discussion";
  endDateCalendarEventLink: string = "https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20211120%2F20211121&details=Show%20off%20the%20awesome%20game%20you%20created%20and%20see%20other%20peoples%27%20as%20well%21&location=The%20CAVE%20-%20Hill%20250&text=Scarlet%20Game%20Jam%20Showcase%20and%20End";

  eventActive: boolean = true;

  merchLink: string = "http://scarlet-game-jam.allcolorsllc.com/";
  signupLink: string = "https://forms.gle/jwcnZoYr3cAM4XHMA";
  itchioLink: string = "https://itch.io/jam/sgj2022s";

  startDateTime: string = "2pm - 6pm";
  endDateTime: string = "11am - 11pm";

  startDateEventPage: string = "https://rutgers.campuslabs.com/engage/event/8000723";
  endDateEventPage: string = "https://rutgers.campuslabs.com/engage/event/8000723";

  constructor(public breakpointManager: BreakpointManagerService, public settings: SettingsService) { }

  ngOnInit(): void {
    if (!this.eventActive) {
      var finalDateSeconds = new Date(this.startDate + ", 2022 16:00:00 EST").getTime() / 1000;
      var flipdown = new FlipDown(finalDateSeconds, "sgj-countdown", {
          theme: "dark",
      }).start();
    }
  }

}
