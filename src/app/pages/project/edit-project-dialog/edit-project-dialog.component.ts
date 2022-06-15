import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImageUploadComponent } from '@src/app/modules/image-upload/image-upload.module';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { BackendService, RolesService, SecurityService } from '@src/app/services/_services.module';
import { CdnService } from '@src/app/services/cdn.service';
import { Project, UpdateProjectInput, UploadOperation } from '@src/generated/graphql-endpoint.types';
import { SettingsService } from '@src/_settings';
import { PartialDeep } from 'type-fest';
import { ProcessMonitor } from '@src/app/classes/_classes.module';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { deepClone } from '@src/app/utils/utils';
import { FormConfigurer } from '@src/app/utils/form-utils';
import { finalize, first } from 'rxjs/operators';
import { gql } from 'apollo-angular';
import { DefaultProjectOptions, ProjectOptions } from '../project-page/project-page.component';
import { AccessOptions } from '../_classes/utils';

export interface EditProjectDialogData {
  project: PartialDeep<Project>;
}

@Component({
  selector: 'app-edit-project-dialog',
  templateUrl: './edit-project-dialog.component.html',
  styleUrls: ['./edit-project-dialog.component.css']
})
export class EditProjectDialogComponent implements AfterViewInit {

  @Output() edited = new EventEmitter<PartialDeep<Project>>();

  project: PartialDeep<Project> = {};
  projectOptions: ProjectOptions = DefaultProjectOptions;

  monitor = new ProcessMonitor();
  accessOptions = AccessOptions;

  form: FormGroup;

  @ViewChild('cardImageUpload') cardImageUpload?: ImageUploadComponent;
  @ViewChild('bannerUpload') bannerUpload?: ImageUploadComponent;
  
  constructor( 
    formBuilder: FormBuilder, 
    private backend: BackendService,
    private cdnService: CdnService,
    private uiMessageService: UIMessageService,
    private changeDetector: ChangeDetectorRef,
    public dialogRef: MatDialogRef<EditProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditProjectDialogData,
  ) {
    this.form = formBuilder.group({
      name: [null, [Validators.required]],
      access: [null, [Validators.required]],
      pitch: [null, [Validators.required]],
      description: [null, []],
    })
    dialogRef.disableClose = true;
    this.project = data.project;
  }

  ngAfterViewInit(): void {
    if (!this.cardImageUpload || !this.bannerUpload || !this.project.id)
      return;

    const formConfig = new FormConfigurer(this.form);
    formConfig.initControl('access', this.project.access);
    formConfig.initControl('name', this.project.name);
    formConfig.initControl('pitch', this.project.pitch);
    formConfig.initControl('description', this.project.description);

    this.cardImageUpload.init(this.cdnService.getFileLink(this.project.cardImageLink));
    this.bannerUpload.init(this.cdnService.getFileLink(this.project.bannerLink));
  }

  exit(success: boolean = false) {
    if (!this.monitor.isProcessing)
      this.dialogRef.close(success);
  }

  validate() {
    try {
      this.form.updateValueAndValidity();
      if (!this.form.valid) {
        throw new Error("Some project information is missing!");
      }
      
      return true;
    } catch(err: any) {
      this.uiMessageService.error(err);
      return false;
    }
  }

  save() {
    if (this.monitor.isProcessing || !this.cardImageUpload || !this.bannerUpload ||
        !this.validate())
      return;

    // Upload profile picture
    const input = <UpdateProjectInput>{
      id: this.project.id
    };

    if (this.form.get("access")?.value !== this.project.access) {
      input.access = this.form.get("access")?.value;
    }

    if (this.form.get("name")?.value !== this.project.name) {
      input.name = this.form.get("name")?.value;
    }
    
    if (this.form.get("pitch")?.value !== this.project.pitch) {
      input.pitch = this.form.get("pitch")?.value;
    }

    if (this.form.get("description")?.value !== this.project.description) {
      input.description = this.form.get("description")?.value;
    }

    if (this.cardImageUpload.edited) {
      if (this.cardImageUpload.value)
        input.cardImage = {
          upload: this.cardImageUpload.value,
          operation: UploadOperation.Insert
        };
      else
        input.cardImage = {
          operation: UploadOperation.Delete
        };
    }
    
    if (this.bannerUpload.edited) {
      if (this.bannerUpload.value)
        input.banner = {
          upload: this.bannerUpload.value,
          operation: UploadOperation.Insert
        };
      else
        input.banner = {
          operation: UploadOperation.Delete
        };
    }

    if (Object.keys(input).length > 1) {
      this.monitor.addProcess();
      this.backend
        .withAuth()
        .mutate<boolean>({
          mutation: gql`
            mutation($input: UpdateProjectInput!) {
              updateProject(input: $input)
            }
          `,
          variables: {
            input
          }
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
          }
        });
    }
  }
}
