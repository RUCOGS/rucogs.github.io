import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService } from '@src/app/services/backend.service';
import { NewUserLoginIdentityInput } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';

export interface CreateLoginIdentityData {
  userId: string;
  takenNames: string[];
}

@Component({
  selector: 'app-create-login-identity-dialog',
  templateUrl: './create-login-identity-dialog.component.html',
  styleUrls: ['./create-login-identity-dialog.component.css'],
})
export class CreateLoginIdentityDialogComponent {
  form: FormGroup;
  monitor = new ProcessMonitor();

  constructor(
    formBuilder: FormBuilder,
    private backend: BackendService,
    private uiMessageService: UIMessageService,
    public dialogRef: MatDialogRef<CreateLoginIdentityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CreateLoginIdentityData,
  ) {
    this.form = formBuilder.group({
      name: [null, [Validators.required]],
      identityId: [null, [Validators.required]],
    });
    dialogRef.disableClose = true;
  }

  exit(success: boolean = false) {
    if (!this.monitor.isProcessing) this.dialogRef.close(success);
  }

  validate() {
    try {
      this.form.updateValueAndValidity();
      if (!this.form.valid) throw new Error('Missing info!');
      return true;
    } catch (err: any) {
      this.uiMessageService.error(err);
      return false;
    }
  }

  async save() {
    if (!this.validate()) return;

    const result = await firstValueFrom(
      this.backend.withAuth().mutate({
        mutation: gql`
          mutation NewUserLoginIdentity($input: NewUserLoginIdentityInput!) {
            newUserLoginIdentity(input: $input)
          }
        `,
        variables: {
          input: <NewUserLoginIdentityInput>{
            userId: this.data.userId,
            name: this.form.get('name')?.value,
            identityId: this.form.get('identityId')?.value,
          },
        },
      }),
    );
    if (result.errors) return;
    this.uiMessageService.notifyConfirmed('Login identity created!');
    this.exit(true);
  }
}
