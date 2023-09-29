import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { defaultUserOptions, UserOptions } from '@pages/users/user-page/classes';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { AuthService } from '@src/app/services/auth.service';
import { BackendService } from '@src/app/services/backend.service';
import { SecurityService } from '@src/app/services/security.service';
import { User, UserLoginIdentity } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';
import {
  CreateLoginIdentityData,
  CreateLoginIdentityDialogComponent,
} from '../create-login-identity-dialog/create-login-identity-dialog.component';
import {
  EditLoginIdentityDialogComponent,
  EditLoginIdentityDialogData,
} from '../edit-login-identity-dialog/edit-login-identity-dialog.component';
import {
  EditUserPrivateDialogComponent,
  EditUserPrivateDialogData,
} from '../edit-user-private-dialog/edit-user-private-dialog.component';
import { LinkNetIdDialogComponent, LinkNetIdDialogData } from '../link-netid-dialog/link-netid-dialog.component';

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.component.html',
  styleUrls: ['./settings-tab.component.css'],
})
export class SettingsTabComponent implements OnChanges {
  @Output() edited = new EventEmitter();

  @Input() user: PartialDeep<User> = {};
  @Input() userOptions: UserOptions = defaultUserOptions();

  monitor = new ProcessMonitor();
  takenLoginIdentityNames: string[] = [];

  constructor(
    private securityService: SecurityService,
    private authService: AuthService,
    private router: Router,
    private backend: BackendService,
    private dialog: MatDialog,
    private uiMessageService: UIMessageService,
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user']) {
      this.takenLoginIdentityNames = this.user.loginIdentities?.map((x) => x?.name ?? '') ?? [];
    }
  }

  getIdentityData(identity: PartialDeep<UserLoginIdentity> | undefined) {
    return JSON.stringify(identity?.data);
  }

  getIdentityName(identity: PartialDeep<UserLoginIdentity> | undefined) {
    return (identity?.name?.charAt(0).toUpperCase() ?? '') + identity?.name?.slice(1);
  }

  onLinkNetId() {
    this.dialog.open(LinkNetIdDialogComponent, {
      data: <LinkNetIdDialogData>{
        user: this.user,
        userOptions: this.userOptions,
      },
      width: '35em',
      maxWidth: '90vw',
    });
  }

  async onEditUserPrivate() {
    const result = await firstValueFrom(
      this.dialog
        .open(EditUserPrivateDialogComponent, {
          data: <EditUserPrivateDialogData>{
            user: this.user,
            userOptions: this.userOptions,
          },
          width: '35em',
          maxWidth: '90vw',
        })
        .afterClosed(),
    );
    if (result) this.edited.emit();
  }

  async onDeleteUser() {
    let confirmMessage = `Are you sure you want to delete "${this.user.username}"? There's no going back!`;
    if (this.securityService.securityContext?.userId === this.user.id)
      confirmMessage = `Are you sure you want to delete your profile? There's no going back!`;
    const confirmed = await firstValueFrom(this.uiMessageService.confirmDialog(confirmMessage));

    if (!confirmed) return;

    this.monitor.addProcess();
    const result = await firstValueFrom(
      this.backend.withAuth().mutate({
        mutation: gql`
          mutation DeleteUser($id: ID!) {
            deleteUser(id: $id)
          }
        `,
        variables: {
          id: this.user.id,
        },
      }),
    );
    this.monitor.removeProcess();

    if (result.errors) return;

    if (this.securityService.securityContext?.userId === this.user.id) {
      this.authService.logout();
    } else {
      this.router.navigateByUrl('/users');
    }
  }

  async onClearCache() {
    this.monitor.addProcess();
    await this.backend.clearCache();
    await this.securityService.clearCache();
    this.monitor.removeProcess();
    this.uiMessageService.notifyInfo('Cache cleared!');
  }

  async onCreateLoginIdentity() {
    const result = await firstValueFrom(
      this.dialog
        .open(CreateLoginIdentityDialogComponent, {
          data: <CreateLoginIdentityData>{
            userId: this.user.id,
            takenNames: this.takenLoginIdentityNames,
          },
        })
        .afterClosed(),
    );

    if (result) this.edited.emit();
  }

  async onEditLoginIdentity(loginIdentity: PartialDeep<UserLoginIdentity> | undefined) {
    if (!loginIdentity) return;
    const result = await firstValueFrom(
      this.dialog
        .open(EditLoginIdentityDialogComponent, {
          data: <EditLoginIdentityDialogData>{
            loginIdentity,
            takenNames: this.takenLoginIdentityNames,
          },
        })
        .afterClosed(),
    );

    if (result) this.edited.emit();
  }

  async onDeleteLoginIdentity(loginIdentity: PartialDeep<UserLoginIdentity> | undefined) {
    if (!loginIdentity) return;
    const confirmed = await firstValueFrom(
      this.uiMessageService.confirmDialog('Are you sure you want to delete this login identity?'),
    );
    if (!confirmed) return;
    const result = await firstValueFrom(
      this.backend.withAuth().mutate({
        mutation: gql`
          mutation DeleteUserLoginIdentity($id: ID!) {
            deleteUserLoginIdentity(id: $id)
          }
        `,
        variables: {
          id: loginIdentity.id,
        },
      }),
    );

    if (result) this.edited.emit();
  }
}
