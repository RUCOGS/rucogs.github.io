import { Component, OnInit } from '@angular/core';
import { getSemesterString } from '@src/app/utils/duration-utils';
import { SettingsService } from '@src/_settings';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
  host: {
    class: 'page',
  },
})
export class HomePageComponent implements OnInit {
  currentSemester: string = '';

  constructor(public settings: SettingsService) {
    this.currentSemester = getSemesterString();
  }

  ngOnInit(): void {}
}
