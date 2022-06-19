import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-group',
  templateUrl: './avatar-group.component.html',
  styleUrls: ['./avatar-group.component.css']
})
export class AvatarGroupComponent implements OnInit {

  @Input() limit: number = -1;
  @Input() avatarSrcs: string[] = [];

  get isLimiting(): boolean {
    return this.limit > -1 && this.avatarSrcs.length > this.limit;
  }

  get limitedAvatarSrcs(): string[] {
    if (this.limit > -1)  {
      return this.avatarSrcs.slice(0, this.limit);
    }
    return this.avatarSrcs;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
