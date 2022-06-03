import { Component, Input, OnInit } from '@angular/core';
import { SOCIAL_PLATFORMS } from '@src/app/utils/social-platforms';
import { UserSocial } from '@src/generated/graphql-endpoint.types';

@Component({
  selector: 'app-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.css']
})
export class SocialButtonComponent implements OnInit {

  @Input() userSocial: Partial<UserSocial> | undefined;

  @Input() icon: string = "";
  @Input() username: string = "";
  @Input() link: string = "";

  constructor() { }

  ngOnInit(): void {
    if (this.userSocial && this.userSocial.link && this.userSocial.username && this.userSocial.platform) {
      const platform = SOCIAL_PLATFORMS[this.userSocial.platform];
      this.icon = platform.icon;
      this.link = this.userSocial.link;
      this.username = this.userSocial.username;
    }
  }

  onClick() {
    window.open(this.link, '_blank');
  }
}
