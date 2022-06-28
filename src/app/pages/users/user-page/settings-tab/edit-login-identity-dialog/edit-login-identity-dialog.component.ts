import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService } from '@src/app/services/_services.module';
import { UpdateUserLoginIdentityInput, UserLoginIdentity } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';

export interface EditLoginIdentityDialogData {
  loginIdentity: PartialDeep<UserLoginIdentity>;
  takenNames: string[];
}

@Component({
  selector: 'app-edit-login-identity-dialog',
  templateUrl: './edit-login-identity-dialog.component.html',
  styleUrls: ['./edit-login-identity-dialog.component.css'],
})
export class EditLoginIdentityDialogComponent {
  form: FormGroup;
  monitor = new ProcessMonitor();

  constructor(
    formBuilder: FormBuilder,
    private backend: BackendService,
    private uiMessage: UIMessageService,
    private dialogRef: MatDialogRef<EditLoginIdentityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditLoginIdentityDialogData,
  ) {
    this.form = formBuilder.group({
      name: [data.loginIdentity.name, [Validators.required]],
      identityId: [data.loginIdentity.identityId, [Validators.required]],
      data: [JSON.stringify(data.loginIdentity.data)],
    });
    this.dialogRef.disableClose = true;
  }

  exit(success: boolean = false) {
    if (!this.monitor.isProcessing) this.dialogRef.close(success);
  }

  validate() {
    try {
      this.form.updateValueAndValidity();
      if (!this.form.valid) throw new Error('Missing info!');

      if (
        this.form.get('name')?.value !== this.data.loginIdentity.name &&
        this.data.takenNames.includes(this.form.get('name')?.value)
      ) {
        throw new Error('Identity with same name already exists!');
      }

      if (this.form.get('data')?.value !== this.data.loginIdentity.id) {
        try {
          JSON.parse(this.form.get('data')?.value);
        } catch (err) {
          throw new Error('Could not parse data as JSON!');
        }
      }

      return true;
    } catch (err: any) {
      this.uiMessage.error(err);
      return false;
    }
  }

  async save() {
    if (!this.validate()) return;

    const input = <UpdateUserLoginIdentityInput>{
      id: this.data.loginIdentity.id,
    };

    if (this.form.get('name')?.value !== this.data.loginIdentity.name) {
      input.name = this.form.get('name')?.value;
    }

    if (this.form.get('identityId')?.value !== this.data.loginIdentity.id) {
      input.identityId = this.form.get('identityId')?.value;
    }

    if (this.form.get('data')?.value !== this.data.loginIdentity.id) {
      input.data = JSON.parse(this.form.get('data')?.value);
    }

    const result = await firstValueFrom(
      this.backend.withAuth().mutate({
        mutation: gql`
          mutation UpdateUserLoginIdentity($input: UpdateUserLoginIdentityInput!) {
            updateUserLoginIdentity(input: $input)
          }
        `,
        variables: {
          input,
        },
      }),
    );
    if (result.errors) {
      this.uiMessage.error('Error uploading data!');
      return;
    }
    this.exit(true);
  }
}
