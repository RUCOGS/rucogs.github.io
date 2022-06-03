import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  @Input() color: string = "blank"
  @Input() size: string = "large";
  @Input() avatarSrc: string = "https://pfps.gg/assets/pfps/6721-rimuru-tempest.png";

  constructor() { }

  ngOnInit(): void {
  }

  getClass() {
    return {
      [this.size]: true,
      [this.color]: true,
    }
  }
}
