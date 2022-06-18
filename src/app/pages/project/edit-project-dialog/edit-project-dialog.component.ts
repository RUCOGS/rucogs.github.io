import { AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Inject, Output, ViewChild } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProcessMonitor } from '@src/app/classes/_classes.module';
import { ImageUploadComponent } from '@src/app/modules/image-upload/image-upload.module';
import { UIMessageService } from '@src/app/modules/ui-message/ui-message.module';
import { CdnService } from '@src/app/services/cdn.service';
import { BackendService } from '@src/app/services/_services.module';
import { arraysEqual } from '@src/app/utils/utils';
import { Project, UpdateProjectInput, UploadOperation } from '@src/generated/graphql-endpoint.types';
import { gql } from 'apollo-angular';
import { first } from 'rxjs/operators';
import { PartialDeep } from 'type-fest';
import { defaultProjectOptions, ProjectOptions } from '../project-page/project-page.component';
import { AccessOptions } from '../_classes/utils';

const soundcloudEmbedRegex = new RegExp(/https%3A\/\/api\.soundcloud\.com\/.+\/[0-9]+/);

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
  projectOptions: ProjectOptions = defaultProjectOptions();

  monitor = new ProcessMonitor();
  accessOptions = AccessOptions;

  form: UntypedFormGroup;

  @ViewChild('cardImageUpload') cardImageUpload?: ImageUploadComponent;
  @ViewChild('bannerUpload') bannerUpload?: ImageUploadComponent;
  
  constructor( 
    formBuilder: UntypedFormBuilder, 
    private backend: BackendService,
    private cdnService: CdnService,
    private uiMessageService: UIMessageService,
    private changeDetector: ChangeDetectorRef,
    public dialogRef: MatDialogRef<EditProjectDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EditProjectDialogData,
  ) {
    this.project = data.project;
    this.form = formBuilder.group({
      name: [this.project.name, [Validators.required]],
      access: [this.project.access, [Validators.required]],
      galleryImageLinks: [this.project.galleryImageLinks],
      // TODO: replace with this.project.downloadLinks
      downloadLinks: [this.project.downloadLinks],
      soundcloudEmbedSrc: [this.project.soundcloudEmbedSrc],
      pitch: [this.project.pitch, [Validators.required]],
      description: [this.project.description],
      tags: [[...(this.project.tags as string[])], []],
    })
    dialogRef.disableClose = true;
  }

  ngAfterViewInit(): void {
    if (!this.cardImageUpload || !this.bannerUpload || !this.project.id)
      return;

    this.cardImageUpload.init(this.cdnService.getFileLink(this.project.cardImageLink));
    this.bannerUpload.init(this.cdnService.getFileLink(this.project.bannerLink));

    this.changeDetector.detectChanges();
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

      if (this.form.get("soundcloudEmbedSrc")?.value !== this.project.soundcloudEmbedSrc) {
        const soundcloudEmbedSrc: string = this.form.get("soundcloudEmbedSrc")?.value ?? "";
        console.log("testing against " + soundcloudEmbedSrc);
        const match = soundcloudEmbedRegex.exec(soundcloudEmbedSrc);
        console.log(match);
        if (!match || match.length === 0) {
          // Process the embed src to find the link
          this.uiMessageService.error("Soundcloud embed source is not valid!");
          return false;
        } else {
          this.form.get("soundcloudEmbedSrc")?.setValue(match[0]);
        }
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

    if (this.form.get("soundcloudEmbedSrc")?.value !== this.project.soundcloudEmbedSrc) {
      input.soundcloudEmbedSrc = this.form.get("soundcloudEmbedSrc")?.value;
    }

    if (!arraysEqual(this.form.get("downloadLinks")?.value, this.project.downloadLinks as string[])) {
      input.downloadLinks = this.form.get("downloadLinks")?.value;
    }
    
    if (!arraysEqual(this.form.get("tags")?.value, this.project.tags as string[])) {
      input.tags = this.form.get("tags")?.value;
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
            mutation DialogUpdateProject($input: UpdateProjectInput!) {
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
            this.uiMessageService.error("Error uploading data!");
          }
        });
    }
  }
}
