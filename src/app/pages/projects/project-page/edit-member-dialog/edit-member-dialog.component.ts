import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService, RolesService } from '@src/app/services/_services.module';
import { ProjectMember, RoleCode, UpdateProjectMemberInput } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { first } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';
import { ProjectMemberOptions } from '../members-tab/members-tab.component';

export interface EditMemberDialogData {
  projectMember: PartialDeep<ProjectMember>;
  projectId: string;
  projectMemberOptions: ProjectMemberOptions;
}

@Component({
  selector: 'app-edit-member-dialog',
  templateUrl: './edit-member-dialog.component.html',
  styleUrls: ['./edit-member-dialog.component.css'],
})
export class EditMemberDialogComponent implements OnInit {
  form: UntypedFormGroup;

  rolesEdited: boolean = false;
  roles: RoleCode[] = [];
  disabledRoles: RoleCode[] = [];
  acceptedRoles: RoleCode[] = [];

  monitor = new ProcessMonitor();

  constructor(
    formBuilder: UntypedFormBuilder,
    private backend: BackendService,
    private uiMessageService: UIMessageService,
    private rolesService: RolesService,
    public dialogRef: MatDialogRef<EditMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditMemberDialogData,
  ) {
    this.form = formBuilder.group({
      contributions: [this.data.projectMember.contributions, []],
    });
    dialogRef.disableClose = true;
  }

  async ngOnInit() {
    if (!this.data.projectMember.roles) return;

    this.roles = this.data.projectMember.roles.map((x) => x?.roleCode as RoleCode);
    this.acceptedRoles = await this.rolesService.getAddableProjectRoles(this.data.projectId);
    this.disabledRoles = await this.rolesService.getDisabledProjectRoles(this.data.projectId);
  }

  exit(success: boolean = false) {
    if (!this.monitor.isProcessing) this.dialogRef.close(success);
  }

  validate() {
    try {
      this.form.updateValueAndValidity();
      if (!this.form.valid) {
        throw new Error('Some project member information is missing!');
      }

      return true;
    } catch (err: any) {
      this.uiMessageService.error(err);
      return false;
    }
  }

  save() {
    if (this.monitor.isProcessing || !this.validate()) return;

    // Upload profile picture
    const input = <UpdateProjectMemberInput>{
      id: this.data.projectMember.id,
    };

    if (this.form.get('contributions')?.value !== this.data.projectMember.contributions) {
      input.contributions = this.form.get('contributions')?.value;
    }

    if (this.rolesEdited) {
      input.roles = this.roles;
    }

    if (Object.keys(input).length > 1) {
      this.monitor.addProcess();
      this.backend
        .withAuth()
        .mutate<boolean>({
          mutation: gql`
            mutation ($input: UpdateProjectMemberInput!) {
              updateProjectMember(input: $input)
            }
          `,
          variables: {
            input,
          },
        })
        .pipe(first())
        .subscribe({
          next: (value) => {
            this.monitor.removeProcess();
            this.exit(true);
          },
          error: (value) => {
            this.monitor.removeProcess();
            this.exit(false);
          },
        });
    }
  }
}
