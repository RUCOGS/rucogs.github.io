import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService, RolesService } from '@src/app/services/_services.module';
import { EBoardTerm, RoleCode, UpdateEBoardTermInput } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';
import { UserOptions } from '../user-page/user-page.component';

export interface EditEBoardTermDialogData {
  term: PartialDeep<EBoardTerm>
  takenYears: number[]
  userOptions: UserOptions
}

@Component({
  selector: 'app-edit-eboard-term-dialog',
  templateUrl: './edit-eboard-term-dialog.component.html',
  styleUrls: ['./edit-eboard-term-dialog.component.css']
})
export class EditEboardTermDialogComponent implements OnInit {
  
  form: FormGroup;
  monitor = new ProcessMonitor();

  rolesEdited: boolean = false;
  roles: RoleCode[] = [];
  acceptedRoles: RoleCode[] = [];
  disabledRoles: RoleCode[] = [];

  constructor(
    formBuilder: FormBuilder,
    private backend: BackendService,
    private uiMessage: UIMessageService,
    private rolesService: RolesService,
    private dialogRef: MatDialogRef<EditEboardTermDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditEBoardTermDialogData
  ) { 
    this.form = formBuilder.group({
      year: [data.term.year, [Validators.required]],
    });
    this.dialogRef.disableClose = true;
  }

  async ngOnInit() {
    this.rolesEdited = false;
    this.roles = this.data.term.roles?.map(x => x?.roleCode as RoleCode) ?? [];
    this.acceptedRoles = await this.rolesService.getAddableEBoardTermRoles();
    this.disabledRoles = await this.rolesService.getDisabledEBoardTermRoles();
  }

  onEditRoles() {
    this.rolesEdited = true;
  }

  exit(success: boolean = false) {
    if (!this.monitor.isProcessing)
      this.dialogRef.close(success);
  }

  validate() {
    try {
      this.form.updateValueAndValidity();
      if (!this.form.valid)
        throw new Error("Missing info!");
      return true;
    } catch(err: any) {
      this.uiMessage.error(err);
      return false;
    }
  }

  async save() {
    if (!this.validate())
      return;
    
    const input = <UpdateEBoardTermInput>{
      id: this.data.term.id
    }

    if (this.form.get('year')?.value !== this.data.term.year) {
      input.year = this.form.get('year')?.value;
    }

    if (this.rolesEdited) {
      input.roles = this.roles;
    }

    const result = await firstValueFrom(this.backend.withAuth().mutate({
      mutation: gql`
        mutation UpdateEBoardTerm($input: UpdateEBoardTermInput!) {
          updateEBoardTerm(input: $input)
        }
      `,
      variables: {
        input
      }
    }));
    if (result.errors) {
      this.uiMessage.error("Error uploading data!");
      return;
    }
    this.exit(true);
  }

  getAvailableYears() {
    const currYear = new Date().getFullYear();
    const availableYears: number[] = [ this.data.term.year! ];
    for (let year = currYear + 3; year >= 2012; year--) {
      if (!this.data.takenYears.includes(year))
        availableYears.push(year);
    }
    return availableYears;
  }
}
