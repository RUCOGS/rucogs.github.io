import { Component, OnInit } from '@angular/core';
import { SettingsService } from '@src/_settings';

@Component({
  selector: 'app-discord',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.css'],
})
export class DiscordComponent implements OnInit {
  constructor(private settings: SettingsService) {}

  ngOnInit(): void {
    window.location.href = this.settings.General.discordLink;
  }
}
