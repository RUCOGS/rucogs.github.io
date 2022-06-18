import { AfterViewInit, Component, Inject, Input, OnInit, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { ImageUploadComponent } from '@src/app/modules/image-upload/image-upload.module';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { UserSocialEdit } from '@src/app/modules/user/editable-social-button/editable-social-button.component';
import { BackendService } from '@src/app/services/backend.service';
import { CdnService } from '@src/app/services/cdn.service';
import { RolesService } from '@src/app/services/roles.service';
import { FormConfigurer } from '@src/app/utils/form-utils';
import { RoleCode, UpdateUserInput, UploadOperation, User } from '@src/generated/graphql-endpoint.types';
import { assertNoDuplicates } from '@src/shared/validation';
import { gql } from 'apollo-angular';
import { finalize, first } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';
import { defaultUserOptions, UserOptions } from '../user-page/user-page.component';

export interface EditUserDialogData {
  user: PartialDeep<User>
}

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css']
})
export class EditUserDialogComponent implements AfterViewInit {

  user: PartialDeep<User> = {};
  // userOptions: UserOptions = DefaultUserOptions();

  @ViewChild('avatarUpload') avatarUpload?: ImageUploadComponent;
  @ViewChild('bannerUpload') bannerUpload?: ImageUploadComponent;
  
  form: UntypedFormGroup;

  userSocialEdits: UserSocialEdit[] = [];
  socialsEdited = false;
  
  roles: RoleCode[] = [];
  disabledRoles: RoleCode[] = [];
  acceptedRoles: RoleCode[] = [];
  rolesEdited = false;

  monitor = new ProcessMonitor();

  constructor(
    formBuilder: UntypedFormBuilder,
    private cdn: CdnService,
    private backend: BackendService,
    private rolesService: RolesService,
    private uiMessageService: UIMessageService,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditUserDialogData,
  ) {
    this.form = formBuilder.group({
      displayName: [null, [Validators.required]],
      bio: [null, []]
    })
    dialogRef.disableClose = true;
    this.user = data.user;
  }

  async ngAfterViewInit() {
    if (!this.avatarUpload || !this.bannerUpload || !this.user.roles || !this.user.id)
      return;  
    
    const formConfig = new FormConfigurer(this.form);
    formConfig.initControl('displayName', this.user.displayName);
    formConfig.initControl('bio', this.user.bio);
    
    this.avatarUpload.init(this.cdn.getFileLink(this.user.avatarLink));
    this.bannerUpload.init(this.cdn.getFileLink(this.user.bannerLink));
    
    this.socialsEdited = false;
    if (this.user.socials)
      this.userSocialEdits = this.user.socials.map(x => new UserSocialEdit({
        link: x?.link ?? "",
        platform: x?.platform ?? "",
        username: x?.username ?? ""
      }));

    this.rolesEdited = false;
    this.roles = this.user.roles.map(x => x?.roleCode as RoleCode);
    this.acceptedRoles = await this.rolesService.getAddableUserRoles();
    this.disabledRoles = await this.rolesService.getDisabledUserRoles();
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

  // Don't save, revert changes
  exit(success: boolean = false) {
    if (!this.monitor.isProcessing)
      this.dialogRef.close(success);
  }

  validate() {
    try {
      for (const userSocialEdit of this.userSocialEdits) {
        if (!userSocialEdit.validate())
          throw new Error("A user social is incomplete!");
      }
      
      assertNoDuplicates(
        this.userSocialEdits.map(x => x.userSocial), 
        (a, b) => {
          return a.username === b.username && a.platform === b.platform
        },
        "Cannot have duplicate user socials with identical usernames and platforms!"
      );

      return true;
    } catch(err: any) {
      this.uiMessageService.error(err);
      return false;
    }
  }

  save() {
    if (this.monitor.isProcessing || !this.avatarUpload || !this.bannerUpload || 
        !this.validate()) {
      return;
    }

    const input = <UpdateUserInput>{
      id: this.user.id
    }

    if (this.rolesEdited) {
      input.roles = this.roles;
    }

    if (this.socialsEdited) {
      input.socials = this.userSocialEdits.map(x => x.userSocial);
    }

    if (this.form.get("displayName")?.value !== this.user.displayName) {
      input.displayName = this.form.get("displayName")?.value;
    }
    
    if (this.form.get("bio")?.value !== this.user.bio) {
      input.bio = this.form.get("bio")?.value;
    }

    if (this.avatarUpload.edited) {
      input.avatar = this.avatarUpload.value ? {
        upload: this.avatarUpload.value,
        operation: UploadOperation.Insert,
      } : {
        operation: UploadOperation.Delete,
      };
    }

    if (this.bannerUpload.edited) {
      input.banner = this.bannerUpload.value ? {
        upload: this.bannerUpload.value,
        operation: UploadOperation.Insert,
      } : {
        operation: UploadOperation.Delete,
      };
    }

    // If change data is not empty, meaning there were changes...
    if (Object.keys(input).length > 1) {
      this.monitor.addProcess();
      this.backend
        .withAuth()
        .mutate<{
          updateUser: boolean
        }>({
          mutation: gql`
            mutation($input: UpdateUserInput!) {
              updateUser(input: $input)
            }
          `,
          variables: {
            input,
          }
        })
        .pipe(
          first()
        )
        .subscribe({
          next: (value) => {
            this.monitor.removeProcess();
            this.exit(true);
          },
          error: (error) => {
            this.monitor.removeProcess();
            this.uiMessageService.error("Error uploading data!");
          }
        });
    }
  }
}
