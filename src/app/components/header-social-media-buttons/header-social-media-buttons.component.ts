import { Component, OnInit } from '@angular/core';
import { SettingsService } from '_settings';

@Component({
  selector: 'app-header-social-media-buttons',
  templateUrl: './header-social-media-buttons.component.html',
  styleUrls: ['./header-social-media-buttons.component.css']
})
export class HeaderSocialMediaButtonsComponent implements OnInit {

  constructor(public settings: SettingsService) { }

  ngOnInit(): void {
  }

}
