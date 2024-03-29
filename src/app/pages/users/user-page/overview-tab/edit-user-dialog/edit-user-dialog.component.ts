import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserOptions } from '@pages/users/user-page/classes';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { ImageUploadComponent } from '@src/app/modules/image-upload/image-upload.module';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { UserSocialEdit } from '@src/app/modules/user/editable-social-button/editable-social-button.component';
import { BackendService } from '@src/app/services/backend.service';
import { CdnService } from '@src/app/services/cdn.service';
import { RolesService } from '@src/app/services/roles.service';
import { RoleCode, UpdateUserInput, UploadOperation, User } from '@src/generated/graphql-endpoint.types';
import { assertNoDuplicates } from '@src/shared/validation';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';

export interface EditUserDialogData {
  user: PartialDeep<User>;
  userOptions: UserOptions;
}

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css'],
})
export class EditUserDialogComponent implements AfterViewInit {
  @ViewChild('avatarUpload') avatarUpload?: ImageUploadComponent;
  @ViewChild('bannerUpload') bannerUpload?: ImageUploadComponent;

  form: FormGroup;

  userSocialEdits: UserSocialEdit[] = [];
  socialsEdited = false;

  roles: RoleCode[] = [];
  disabledRoles: RoleCode[] = [];
  acceptedRoles: RoleCode[] = [];
  rolesEdited = false;

  monitor = new ProcessMonitor();

  constructor(
    formBuilder: FormBuilder,
    private cdn: CdnService,
    private backend: BackendService,
    private rolesService: RolesService,
    private uiMessageService: UIMessageService,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditUserDialogData,
  ) {
    this.form = formBuilder.group({
      displayName: [data.user.displayName, [Validators.required]],
      bio: [data.user.bio, []],
      classYear: [data.user.classYear, []],
      createdAt: [new Date(this.data.user.createdAt)],
    });
    dialogRef.disableClose = true;
  }

  async ngAfterViewInit() {
    // Keep change detector happy by not running it on the same frame as AfterViewInit
    setTimeout(async () => {
      if (!this.avatarUpload || !this.bannerUpload || !this.data.user.roles || !this.data.user.id) return;

      this.avatarUpload.init(this.cdn.getFileLink(this.data.user.avatarLink));
      this.bannerUpload.init(this.cdn.getFileLink(this.data.user.bannerLink));

      this.socialsEdited = false;
      if (this.data.user.socials)
        this.userSocialEdits = this.data.user.socials.map(
          (x) =>
            new UserSocialEdit({
              link: x?.link ?? '',
              platform: x?.platform ?? '',
              username: x?.username ?? '',
            }),
        );

      this.rolesEdited = false;
      this.roles = this.data.user.roles.map((x) => x?.roleCode as RoleCode);
      this.acceptedRoles = await this.rolesService.getAddableUserRoles();
      this.disabledRoles = await this.rolesService.getDisabledUserRoles();
    }, 0);
  }

  onEditSocial() {
    this.socialsEdited = true;
  }

  onEditRoles() {
    this.rolesEdited = true;
  }

  onAddSocial() {
    this.userSocialEdits.push(new UserSocialEdit());
  }

  onDeleteSocial(index: number) {
    this.userSocialEdits.splice(index, 1);
  }

  exit(success: boolean = false) {
    if (!this.monitor.isProcessing) this.dialogRef.close(success);
  }

  validate() {
    try {
      this.form.updateValueAndValidity();
      if (!this.form.valid) throw new Error('Missing info!');

      for (const userSocialEdit of this.userSocialEdits) {
        if (!userSocialEdit.validate()) throw new Error('A user social is incomplete!');
      }

      assertNoDuplicates(
        this.userSocialEdits.map((x) => x.userSocial),
        (a, b) => {
          return a.username === b.username && a.platform === b.platform;
        },
        'Cannot have duplicate user socials with identical usernames and platforms!',
      );

      return true;
    } catch (err: any) {
      this.uiMessageService.error(err);
      return false;
    }
  }

  async save() {
    if (this.monitor.isProcessing || !this.avatarUpload || !this.bannerUpload || !this.validate()) {
      return;
    }

    const input = <UpdateUserInput>{
      id: this.data.user.id,
    };

    if (this.rolesEdited) {
      input.roles = this.roles;
    }

    if (this.socialsEdited) {
      input.socials = this.userSocialEdits.map((x) => x.userSocial);
    }

    if (this.form.get('displayName')?.value !== this.data.user.displayName) {
      input.displayName = this.form.get('displayName')?.value;
    }

    if (this.form.get('bio')?.value !== this.data.user.bio) {
      input.bio = this.form.get('bio')?.value;
    }

    if (this.form.get('classYear')?.value !== this.data.user.classYear) {
      input.classYear = this.form.get('classYear')?.value;
    }

    if (this.avatarUpload.edited) {
      input.avatar = this.avatarUpload.value
        ? {
            upload: this.avatarUpload.value,
            operation: UploadOperation.Insert,
          }
        : {
            operation: UploadOperation.Delete,
          };
    }

    if (this.bannerUpload.edited) {
      input.banner = this.bannerUpload.value
        ? {
            upload: this.bannerUpload.value,
            operation: UploadOperation.Insert,
          }
        : {
            operation: UploadOperation.Delete,
          };
    }

    if (this.data.userOptions.canManageMetadata) {
      const createdAtDateTime = (this.form.get('createdAt')?.value as Date | undefined)?.getTime();
      if (createdAtDateTime !== this.data.user.createdAt) {
        input.createdAt = createdAtDateTime;
      }
    }

    // If change data is not empty, meaning there were changes...
    if (Object.keys(input).length > 1) {
      this.monitor.addProcess();
      const result = await firstValueFrom(
        this.backend.withAuth().mutate<{
          updateUser: boolean;
        }>({
          mutation: gql`
            mutation EditUserDialog($input: UpdateUserInput!) {
              updateUser(input: $input)
            }
          `,
          variables: {
            input,
          },
        }),
      );
      this.monitor.removeProcess();
      if (result.errors) {
        this.uiMessageService.error('Error uploading data!');
        return;
      }
      this.exit(true);
    }
  }

  getAvailableYears() {
    const currYear = new Date().getFullYear();
    const availableYears: number[] = [];
    for (let year = currYear + 8; year >= 2014; year--) {
      availableYears.push(year);
    }
    return availableYears;
  }
}
