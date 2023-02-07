import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-discord',
  templateUrl: './discord.component.html',
  styleUrls: ['./discord.component.css'],
})
export class DiscordComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    window.location.href = 'https://discord.gg/aQUgesr';
  }
}
