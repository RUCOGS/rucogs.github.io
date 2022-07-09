import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserOptions } from '@pages/users/user-page/classes';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService } from '@src/app/services/backend.service';
import { UpdateUserInput, User } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';

export interface EditUserPrivateDialogData {
  user: PartialDeep<User>;
  userOptions: UserOptions;
}

@Component({
  selector: 'app-edit-user-private-dialog',
  templateUrl: './edit-user-private-dialog.component.html',
  styleUrls: ['./edit-user-private-dialog.component.css'],
})
export class EditUserPrivateDialogComponent {
  form: FormGroup;

  monitor = new ProcessMonitor();

  constructor(
    formBuilder: FormBuilder,
    private backend: BackendService,
    private uiMessageService: UIMessageService,
    public dialogRef: MatDialogRef<EditUserPrivateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditUserPrivateDialogData,
  ) {
    this.form = formBuilder.group({
      email: [data.user.email, [Validators.email]],
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
    if (this.monitor.isProcessing || !this.validate()) {
      return;
    }

    const input = <UpdateUserInput>{
      id: this.data.user.id,
    };

    if (this.form.get('email')?.value !== this.data.user.email) {
      input.email = this.form.get('email')?.value ?? null;
    }

    // If change data is not empty, meaning there were changes...
    if (Object.keys(input).length > 1) {
      this.monitor.addProcess();
      const result = await firstValueFrom(
        this.backend.withAuth().mutate<{
          updateUser: boolean;
        }>({
          mutation: gql`
            mutation EditUserPrivateDialog($input: UpdateUserInput!) {
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
}
