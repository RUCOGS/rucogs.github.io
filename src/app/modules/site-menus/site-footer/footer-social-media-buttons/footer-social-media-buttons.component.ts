import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@src/_settings';

@Component({
  selector: 'app-footer-social-media-buttons',
  templateUrl: './footer-social-media-buttons.component.html',
  styleUrls: ['./footer-social-media-buttons.component.css'],
})
export class FooterSocialMediaButtonsComponent implements OnInit {
  constructor(public settings: SettingsService) {}

  ngOnInit(): void {}
}
