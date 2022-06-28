import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService } from '@src/app/services/backend.service';
import { NewUserInput, User } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.css'],
})
export class CreateUserDialogComponent implements OnInit {
  form: FormGroup;
  monitor = new ProcessMonitor();

  constructor(
    formBuilder: FormBuilder,
    private uiMessage: UIMessageService,
    private backend: BackendService,
    public dialogRef: MatDialogRef<CreateUserDialogComponent>,
  ) {
    this.form = formBuilder.group({
      username: [null, [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]*$/)]],
      displayName: [null, Validators.required],
      email: [null, [Validators.email]],
    });
    dialogRef.disableClose = true;
  }

  ngOnInit(): void {}

  exit(success: boolean = false, user: PartialDeep<User> = {}) {
    if (!this.monitor.isProcessing)
      this.dialogRef.close({
        success,
        user,
      });
  }

  validate() {
    try {
      this.form.updateValueAndValidity();
      if (!this.form.valid) throw new Error('Missing some info!');

      return true;
    } catch (err: any) {
      this.uiMessage.error(err);
      return false;
    }
  }

  async save() {
    if (this.monitor.isProcessing || !this.validate()) {
      return;
    }

    const input = <NewUserInput>{
      username: this.form.get('username')?.value,
    };

    if (this.form.get('displayName')?.value) {
      input.displayName = this.form.get('displayName')?.value;
    }

    if (this.form.get('email')?.value) {
      input.email = this.form.get('email')?.value;
    }

    // If change data is not empty, meaning there were changes...
    if (Object.keys(input).length > 1) {
      this.monitor.addProcess();
      const result = await firstValueFrom(
        this.backend.withAuth().mutate<{
          newUser: string;
        }>({
          mutation: gql`
            mutation CreateUserDialog($input: NewUserInput!) {
              newUser(input: $input)
            }
          `,
          variables: {
            input,
          },
        }),
      );
      this.monitor.removeProcess();
      if (result.errors) {
        this.uiMessage.error('Error uploading data!');
        return;
      }
      this.uiMessage.notifyConfirmed('User created!');
      this.exit(true, {
        id: result.data?.newUser,
        ...input,
      });
    }
  }
}
