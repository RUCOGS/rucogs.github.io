import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User, UserLoginIdentity } from '@src/generated/graphql-endpoint.types';
import { PartialDeep } from 'type-fest';
import { defaultUserOptions, UserOptions } from '../user-page/user-page.component';

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.component.html',
  styleUrls: ['./settings-tab.component.css']
})
export class SettingsTabComponent implements OnInit {

  @Output() edited = new EventEmitter();

  @Input() user: PartialDeep<User> = {};
  @Input() userOptions: UserOptions = defaultUserOptions();

  constructor() { }

  ngOnInit(): void {
  }

  identityData: {
    [key: string]: {
      name: string
    }
  } = {
    'discord': {
      name: 'Discord'
    }
  }

  getIdentityData(identity: PartialDeep<UserLoginIdentity> | undefined) {
    return JSON.stringify(identity?.data);
  }

  getIdentityStaticData(identity: PartialDeep<UserLoginIdentity> | undefined) {
    if (!identity || !identity.name)
      return undefined;
    return this.identityData[identity.name];
  }
}
