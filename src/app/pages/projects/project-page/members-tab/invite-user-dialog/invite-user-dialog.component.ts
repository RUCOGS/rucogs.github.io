import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService } from '@src/app/services/backend.service';
import { InviteType, NewProjectInviteInput, Project } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';

export interface InviteUserDialogData {
  project: PartialDeep<Project>;
}

@Component({
  selector: 'app-invite-user-dialog',
  templateUrl: './invite-user-dialog.component.html',
  styleUrls: ['./invite-user-dialog.component.css'],
})
export class InviteUserDialogComponent implements OnInit {
  form: UntypedFormGroup;

  monitor = new ProcessMonitor();

  constructor(
    formBuilder: UntypedFormBuilder,
    private backend: BackendService,
    private uiMessage: UIMessageService,
    public dialogRef: MatDialogRef<InviteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InviteUserDialogData,
  ) {
    this.form = formBuilder.group({
      user: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {}

  exit(success: boolean = false) {
    if (!this.monitor.isProcessing) this.dialogRef.close(success);
  }

  validate() {
    try {
      this.form.updateValueAndValidity();
      if (!this.form.valid) throw new Error('Form is incomplete!');

      const userId = this.form.get('user')?.value;
      if (this.data.project.invites?.some((x) => x?.user?.id === userId && x?.type === InviteType.Outgoing))
        throw new Error('User already has an outgoing invite from this project!');

      if (this.data.project.members?.some((x) => x?.user?.id === userId))
        throw new Error('User is already in the project!');

      return true;
    } catch (err) {
      if (err instanceof Error) this.uiMessage.error(err.message);
      return false;
    }
  }

  async invite() {
    if (this.monitor.isProcessing || !this.validate()) return;

    this.monitor.addProcess();

    const result = await firstValueFrom(
      this.backend.withAuth().mutate({
        mutation: gql`
          mutation InviteUserToProject($input: NewProjectInviteInput!) {
            newProjectInvite(input: $input)
          }
        `,
        variables: {
          input: <NewProjectInviteInput>{
            type: InviteType.Outgoing,
            projectId: this.data.project.id,
            userId: this.form.get('user')?.value,
          },
        },
      }),
    );
    this.monitor.removeProcess();
    if (result.errors) return;

    return this.exit(true);
  }
}
