import { AfterViewInit, Component, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { ImageUploadComponent } from '@src/app/modules/image-upload/image-upload.module';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService } from '@src/app/services/backend.service';
import { CdnService } from '@src/app/services/cdn.service';
import { EBoard, UpdateEBoardInput, UploadOperation } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { firstValueFrom } from 'rxjs';
import { PartialDeep } from 'type-fest';

export interface EditEBoardDialogData {
  eBoard: PartialDeep<EBoard>
}

@Component({
  selector: 'app-edit-eboard-dialog',
  templateUrl: './edit-eboard-dialog.component.html',
  styleUrls: ['./edit-eboard-dialog.component.css']
})
export class EditEboardDialogComponent implements AfterViewInit {

  @ViewChild('avatarUpload') avatarUpload?: ImageUploadComponent;

  form: FormGroup;
  monitor = new ProcessMonitor();

  constructor(
    formBuilder: FormBuilder,
    private cdn: CdnService,
    private backend: BackendService,
    private uiMessage: UIMessageService,
    private dialogRef: MatDialogRef<EditEboardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditEBoardDialogData
  ) { 
    this.form = formBuilder.group({
      bio: [data.eBoard.bio, [Validators.required]],
    });
    this.dialogRef.disableClose = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      if (!this.avatarUpload)
        return;
      this.avatarUpload.init(this.cdn.getFileLink(this.data.eBoard.avatarLink));
    }, 0);
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
    } catch(err) {
      if (err instanceof Error)
        this.uiMessage.error(err.message);
      return false;
    }
  }

  async save() {
    if (!this.validate() || !this.avatarUpload)
      return;
    this.monitor.addProcess();

    const input = <UpdateEBoardInput>{
      id: this.data.eBoard.id
    }

    if (this.form.get('bio') !== this.data.eBoard.bio) {
      input.bio = this.form.get('bio')?.value;
    }

    if (this.avatarUpload.edited) {
      input.avatar = this.avatarUpload.value ? {
        upload: this.avatarUpload.value,
        operation: UploadOperation.Insert,
      } : {
        operation: UploadOperation.Delete,
      };
    }

    if (Object.keys(input).length > 1) {
      const result = await firstValueFrom(this.backend.withAuth().mutate({
        mutation: gql`
          mutation UpdateEBoard($input: UpdateEBoardInput!) {
            updateEBoard(input: $input)
          }
        `,
        variables: {
          input
        }
      }));
      this.monitor.removeProcess();
      if (result.errors) {
        this.uiMessage.error("Error uploading data!");
        return;
      }
      this.exit(true);
    }
  }
}
