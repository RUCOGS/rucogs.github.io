import { Component, Input, OnInit } from '@angular/core';
import { CdnService } from '@src/app/services/cdn.service';
import { User } from '@src/generated/graphql-endpoint.types';
import { PartialDeep } from 'type-fest';

@Component({
  selector: 'app-basic-profile',
  templateUrl: './basic-profile.component.html',
  styleUrls: ['./basic-profile.component.css']
})
export class BasicProfileComponent implements OnInit {

  @Input() link: string = "";
  @Input() user: PartialDeep<User> = {
    avatarLink: "https://pfps.gg/assets/pfps/6721-rimuru-tempest.png",
    username: "Atlinx",
    displayName: "At Lynx"
  }
  @Input() clickable: boolean = true;

  constructor(
    public cdnService: CdnService
  ) { }

  ngOnInit(): void {
    if (this.link === "" && this.user.username)
      this.link = `users/${this.user.username}`;
  }
}
