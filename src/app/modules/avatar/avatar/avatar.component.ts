import { Component, Input, OnInit } from '@angular/core';
import { SettingsService } from '@src/_settings';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  @Input() color: string = "blank"
  @Input() size: string = "large";
  @Input() avatarSrc: string = "";

  constructor(private settings: SettingsService) { }

  ngOnInit(): void {
  }

  getClass() {
    return {
      [this.size]: true,
      [this.color]: true,
    }
  }

  getAvatarSrc() {
    if (this.avatarSrc)
      return this.avatarSrc;
    return this.settings.General.defaultAvatarSrc;
  }
}
