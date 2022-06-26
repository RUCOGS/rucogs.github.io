import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService } from '@src/app/services/backend.service';
import { NewEBoardTermInput } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';

export interface AddEboardTermDialogData {
  eBoardId: string;
  takenYears: number[];
}

@Component({
  selector: 'app-add-eboard-term-dialog',
  templateUrl: './add-eboard-term-dialog.component.html',
  styleUrls: ['./add-eboard-term-dialog.component.css'],
})
export class AddEboardTermDialogComponent {
  form: FormGroup;
  monitor = new ProcessMonitor();

  constructor(
    formBuilder: FormBuilder,
    private backend: BackendService,
    private uiMessageService: UIMessageService,
    public dialogRef: MatDialogRef<AddEboardTermDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddEboardTermDialogData,
  ) {
    this.form = formBuilder.group({
      year: [null, [Validators.required]],
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
          mutation NewEBoardTerm($input: NewEBoardTermInput!) {
            newEBoardTerm(input: $input)
          }
        `,
        variables: {
          input: <NewEBoardTermInput>{
            eBoardId: this.data.eBoardId,
            year: this.form.get('year')?.value,
          },
        },
      }),
    );
    if (result.errors) return;
    this.uiMessageService.notifyConfirmed('Term created!');
    this.exit(true);
  }

  getAvailableYears() {
    const currYear = new Date().getFullYear();
    const availableYears: number[] = [];
    for (let year = currYear + 3; year >= 2012; year--) {
      if (!this.data.takenYears.includes(year)) availableYears.push(year);
    }
    return availableYears;
  }
}
