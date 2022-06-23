import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@src/_settings';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css' ],
  host: {
    class: 'page'
  }
})
export class HomePageComponent implements OnInit {

  currentSemester: string = "";

  constructor(public settings: SettingsService) {
    var now = new Date();
    var markerOne = new Date(`1/1/${now.getFullYear()}`);
    var markerTwo = new Date(`5/15/${now.getFullYear()}`);
    var markerThree = new Date(`12/15/${now.getFullYear()}`);
    var markerFour = new Date(`12/31/${now.getFullYear()}`);

    // one to two = Spring
    // two to three = Fall
    // three to four = Spring

    if (markerOne <= now && now < markerTwo)
      this.currentSemester = "Spring " + now.getFullYear();
    else if (markerTwo <= now && now < markerThree)
      this.currentSemester = "Fall " + now.getFullYear();
    else if (markerThree <= now && now <= markerFour)
      this.currentSemester = "Spring " + (now.getFullYear() + 1);
  }

  ngOnInit(): void {
  }

}
