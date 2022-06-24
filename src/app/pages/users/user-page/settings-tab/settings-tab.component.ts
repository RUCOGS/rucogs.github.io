import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { AuthService } from '@src/app/services/auth.service';
import { BackendService } from '@src/app/services/backend.service';
import { SecurityService } from '@src/app/services/security.service';
import { User, UserLoginIdentity } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';
import { defaultUserOptions, UserOptions } from '../user-page/user-page.component';

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.component.html',
  styleUrls: ['./settings-tab.component.css']
})
export class SettingsTabComponent {

  @Output() edited = new EventEmitter();

  @Input() user: PartialDeep<User> = {};
  @Input() userOptions: UserOptions = defaultUserOptions();

  monitor = new ProcessMonitor();

  constructor(
    private securityService: SecurityService,
    private authService: AuthService,
    private router: Router,
    private backend: BackendService,
    private uiMessageService: UIMessageService
  ) { }

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

  async deleteUser() {
    let confirmMessage = `Are you sure you want to delete "${this.user.username}"? There's no going back!`;
    if (this.securityService.securityContext?.userId === this.user.id)
      confirmMessage = `Are you sure you want to delete your profile? There's no going back!`;
    const confirmed = await firstValueFrom(this.uiMessageService.confirmDialog(confirmMessage));
    
    if (!confirmed)
      return;
    
    this.monitor.addProcess();
    const result = await firstValueFrom(this.backend.withAuth().mutate({
      mutation: gql`
        mutation DeleteUser($id: ID!) {
          deleteUser(id: $id)
        }
      `,
      variables: {
        id: this.user.id
      }
    }));
    this.monitor.removeProcess();

    if (result.errors)
      return;
    
    if (this.securityService.securityContext?.userId === this.user.id) {
      this.authService.logout();
    } else {
      this.router.navigateByUrl('/users');
    }
  }
}
