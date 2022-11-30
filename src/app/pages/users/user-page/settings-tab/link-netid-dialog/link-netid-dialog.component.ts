import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserOptions } from '@pages/users/user-page/classes';
import { CustomValidators } from '@src/app/classes/custom-validators';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService } from '@src/app/services/backend.service';
import { User, VerifyNetIdInput } from '@src/generated/graphql-endpoint.types';
import { UserFilterInput } from '@src/generated/model.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';

export interface LinkNetIdDialogData {
  user: PartialDeep<User>;
  userOptions: UserOptions;
}

@Component({
  selector: 'app-link-netid-dialog',
  templateUrl: './link-netid-dialog.component.html',
  styleUrls: ['./link-netid-dialog.component.css'],
})
export class LinkNetIdDialogComponent {
  form: FormGroup;

  monitor = new ProcessMonitor();

  constructor(
    formBuilder: FormBuilder,
    private backend: BackendService,
    private uiMessageService: UIMessageService,
    public dialogRef: MatDialogRef<LinkNetIdDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LinkNetIdDialogData,
  ) {
    this.form = formBuilder.group({
      netId: [data.user.netId, [CustomValidators.netId]],
    });
    dialogRef.disableClose = true;
  }

  exit(success: boolean = false) {
    if (!this.monitor.isProcessing) this.dialogRef.close(success);
  }

  async validate() {
    try {
      this.form.updateValueAndValidity();
      if (!this.form.valid) throw new Error('Missing info!');

      const netId = this.form.get('netId')?.value;
      if (netId !== this.data.user.netId) {
        const result = await firstValueFrom(
          this.backend.withAuth().query<{
            users: any[];
          }>({
            query: gql`
              query CheckDuplicateNetId($filter: UserFilterInput!) {
                users(filter: $filter) {
                  id
                }
              }
            `,
            variables: {
              filter: <UserFilterInput>{
                netId: { eq: netId },
              },
            },
          }),
        );
        if (result.data.users.length > 0) throw new Error(`NetID "${netId}" is already linked to an account!`);
      }

      return true;
    } catch (err: any) {
      this.uiMessageService.error(err);
      return false;
    }
  }

  async save() {
    if (this.monitor.isProcessing || !(await this.validate())) {
      return;
    }

    const input = <VerifyNetIdInput>{
      userId: this.data.user.id,
    };

    if (this.form.get('netId')?.value !== this.data.user.netId) {
      input.netId = this.form.get('netId')?.value ?? null;
    }

    // If change data is not empty, meaning there were changes...
    if (Object.keys(input).length > 1) {
      this.monitor.addProcess();
      const result = await firstValueFrom(
        this.backend.withAuth().mutate<{
          updateUser: boolean;
        }>({
          mutation: gql`
            mutation LinkNetIdDialog($input: VerifyNetIdInput!) {
              verifyNetId(input: $input)
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
      this.uiMessageService.notifyInfo(
        'Verification email has been sent to your Rutgers email! Please follow the instructions in the email to finish linking your NetID.',
      );
      this.exit(true);
    }
  }
}
