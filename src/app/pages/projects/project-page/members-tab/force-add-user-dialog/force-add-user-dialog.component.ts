import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService } from '@src/app/services/backend.service';
import { NewProjectMemberInput, Project } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';

export interface ForceAddUserDialogData {
  project: PartialDeep<Project>;
}

@Component({
  selector: 'app-force-add-user-dialog',
  templateUrl: './force-add-user-dialog.component.html',
  styleUrls: ['./force-add-user-dialog.component.css'],
})
export class ForceAddUserDialogComponent {
  form: FormGroup;
  monitor = new ProcessMonitor();

  constructor(
    formBuilder: FormBuilder,
    private backend: BackendService,
    private uiMessage: UIMessageService,
    private dialogRef: MatDialogRef<ForceAddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ForceAddUserDialogData,
  ) {
    this.form = formBuilder.group({
      user: [null, [Validators.required]],
    });
  }

  async exit(success: boolean = false) {
    if (!this.monitor.isProcessing) this.dialogRef.close(success);
  }

  validate() {
    try {
      this.form.updateValueAndValidity();
      if (!this.form.valid) throw new Error('Missing info!');

      if (this.data.project.members?.some((x) => x?.user?.id === this.form.get('user')?.value))
        throw new Error('User is already in the project!');

      return true;
    } catch (err) {
      if (err instanceof Error) this.uiMessage.error(err.message);
      return false;
    }
  }

  async add() {
    if (this.monitor.isProcessing || !this.validate()) return;

    this.monitor.addProcess();
    const result = await firstValueFrom(
      this.backend.withAuth().mutate({
        mutation: gql`
          mutation ForceCreateProjectMember($input: NewProjectMemberInput!) {
            newProjectMember(input: $input)
          }
        `,
        variables: {
          input: <NewProjectMemberInput>{
            projectId: this.data.project.id,
            userId: this.form.get('user')?.value,
          },
        },
      }),
    );
    this.monitor.removeProcess();
    if (result.errors) return;

    this.exit(true);
  }
}
