import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-avatar-group',
  templateUrl: './avatar-group.component.html',
  styleUrls: ['./avatar-group.component.css']
})
export class AvatarGroupComponent implements OnInit {

  @Input() avatarSrcs: string[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
