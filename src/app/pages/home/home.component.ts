import { Component, OnInit } from '@angular/core';
import { SettingsService } from '_settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css' ],
  host: {
    class: 'page'
  }
})
export class HomeComponent implements OnInit {

  constructor(public settings: SettingsService) { }

  ngOnInit(): void {
  }

}
