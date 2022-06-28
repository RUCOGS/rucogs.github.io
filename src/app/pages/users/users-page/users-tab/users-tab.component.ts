import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { SecurityService } from '@src/app/services/security.service';
import { Permission } from '@src/generated/graphql-endpoint.types';
import { firstValueFrom } from 'rxjs';
import { CreateUserDialogComponent } from '../create-user-dialog/create-user-dialog.component';

@Component({
  selector: 'app-users-tab',
  templateUrl: './users-tab.component.html',
  styleUrls: ['./users-tab.component.css'],
})
export class UsersTabComponent implements OnInit {
  canCreateUser = false;

  constructor(
    private security: SecurityService,
    private uiMessage: UIMessageService,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  async ngOnInit() {
    await this.security.waitUntilReady();

    this.canCreateUser = this.security.makePermCalc().hasPermission(Permission.CreateUser);
    console.log('can create user ' + this.canCreateUser);
  }

  async onCreateUser() {
    const result = await firstValueFrom(
      this.dialog
        .open(CreateUserDialogComponent, {
          width: '25em',
          maxWidth: '90vw',
        })
        .afterClosed(),
    );

    if (!result.success) return;

    this.router.navigateByUrl(`/members/${result.user.username}`);
  }
}
