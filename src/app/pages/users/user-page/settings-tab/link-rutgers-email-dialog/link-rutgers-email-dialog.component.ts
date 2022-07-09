import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserOptions } from '@pages/users/user-page/classes';
import { CustomValidators } from '@src/app/classes/custom-validators';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService } from '@src/app/services/backend.service';
import { User, VerifyRutgersEmailInput } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';

export interface LinkRutgersEmailDialogData {
  user: PartialDeep<User>;
  userOptions: UserOptions;
}

@Component({
  selector: 'app-link-rutgers-email-dialog',
  templateUrl: './link-rutgers-email-dialog.component.html',
  styleUrls: ['./link-rutgers-email-dialog.component.css'],
})
export class LinkRutgersEmailDialogComponent {
  form: FormGroup;

  monitor = new ProcessMonitor();

  constructor(
    formBuilder: FormBuilder,
    private backend: BackendService,
    private uiMessageService: UIMessageService,
    public dialogRef: MatDialogRef<LinkRutgersEmailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: LinkRutgersEmailDialogData,
  ) {
    this.form = formBuilder.group({
      rutgersEmail: [data.user.rutgersEmail, [CustomValidators.rutgersEmail]],
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

    const input = <VerifyRutgersEmailInput>{
      userId: this.data.user.id,
    };

    if (this.form.get('rutgersEmail')?.value !== this.data.user.rutgersEmail) {
      input.rutgersEmail = this.form.get('rutgersEmail')?.value ?? null;
    }

    // If change data is not empty, meaning there were changes...
    if (Object.keys(input).length > 1) {
      this.monitor.addProcess();
      const result = await firstValueFrom(
        this.backend.withAuth().mutate<{
          updateUser: boolean;
        }>({
          mutation: gql`
            mutation LinkRutgersEmailDialog($input: VerifyRutgersEmailInput!) {
              verifyRutgersEmail(input: $input)
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
        'Verification email has been sent! Please follow the instructions in that email to finish linking it to this account.',
      );
      this.exit(true);
    }
  }
}
