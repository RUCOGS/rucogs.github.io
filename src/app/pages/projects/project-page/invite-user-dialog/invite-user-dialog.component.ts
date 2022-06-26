import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService } from '@src/app/services/backend.service';
import { InviteType, NewProjectInviteInput, Project, User } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { first } from 'rxjs/operators';
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
  project: PartialDeep<Project> = {};
  form: UntypedFormGroup;

  monitor = new ProcessMonitor();

  constructor(
    formBuilder: UntypedFormBuilder,
    private backend: BackendService,
    private uiMessageService: UIMessageService,
    public dialogRef: MatDialogRef<InviteUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: InviteUserDialogData,
  ) {
    this.form = formBuilder.group({
      user: [null, [Validators.required]],
    });
    this.project = data.project;
  }

  ngOnInit(): void {}

  exit(success: boolean = false) {
    if (!this.monitor.isProcessing) this.dialogRef.close(success);
  }

  validate() {
    this.form.updateValueAndValidity();
    if (!this.form.valid) {
      this.uiMessageService.error('Form is incomplete!');
      return false;
    }

    const userId = this.form.get('user')?.value;
    if (this.project.invites?.some((x) => x?.user?.id === userId && x?.type === InviteType.Outgoing)) {
      this.uiMessageService.error('User already has an outgoing invite from this project!');
      return false;
    }
    if (this.project.members?.some((x) => x?.user?.id === userId)) {
      this.uiMessageService.error('User is already in the project!');
      return false;
    }
    return true;
  }

  async invite() {
    if (this.monitor.isProcessing || !this.validate()) return;

    this.monitor.addProcess();

    const userId = this.form.get('user')?.value;

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
            projectId: this.project.id,
            userId: userId,
          },
        },
      }),
    );

    if (result.errors) return;

    this.monitor.removeProcess();
    return this.exit(true);
  }
}
