import { FocusMonitor } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, ElementRef, Input, OnInit, Optional, Self, ViewChild } from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ProcessMonitor } from '@app/classes/process-monitor';
import { BaseCustomInputComponent } from '@app/modules/base-custom-input/base-custom-input.module';
import { UIMessageService } from '@app/modules/ui-message/ui-message.module';
import { CdnService } from '@src/app/services/cdn.service';
import { FileUtils } from '@src/app/utils/_utils.module';
import { UploadOrSource } from '@src/generated/graphql-endpoint.types';

@Component({
  selector: 'app-gallery-upload',
  templateUrl: './gallery-upload.component.html',
  styleUrls: ['./gallery-upload.component.css'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: GalleryUploadComponent,
    }
  ]
})
export class GalleryUploadComponent extends BaseCustomInputComponent<UploadOrSource[]> implements OnInit {

  @ViewChild('imageFileInput') imageFileInput?: ElementRef;
  @Input() fileSizeLimit: string = "10 MB";
  @Input() limit: number = -1;

  monitor = new ProcessMonitor();
  fileSizeLimitBytes: number = 0;

  constructor(
    public cdn: CdnService,
    private uiMessageService: UIMessageService,
    private changeDetector: ChangeDetectorRef,

    focusMonitor: FocusMonitor,
    elementRef: ElementRef,
    @Optional() @Self() ngControl: NgControl,
  ) { 
    super(
      focusMonitor,
      elementRef,
      ngControl
    )
  }

  ngOnInit(): void {
    this.fileSizeLimitBytes = FileUtils.byteStringToBytes(this.fileSizeLimit);
  }

  get shouldLabelFloat(): boolean {
    return true;
  }

  onImageFileChanged(event: any) {
    if (this.limit > -1 && this.value && this.value.length > this.limit)
      return;
    const file: File = event.target.files[0];
    
    if (file) {
      this.monitor.addProcess();
      this.changeDetector.detectChanges();
      FileUtils.readAsBase64(file)
        .then(result => {
          // Limit file size
          const filesize = file.size;
          if (filesize < this.fileSizeLimitBytes) {
            if (!this.value)
              this.value = [];
            this.value.push({
              upload: file,
              source: result
            })
            this.onChange(this.value);
            this.markAsTouched();
          } else {
            this.uiMessageService.error(`File size is too big! ${FileUtils.byteSizeToString(filesize)} > ${FileUtils.byteSizeToString(this.fileSizeLimitBytes)}`);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          if (this.imageFileInput) {
            this.imageFileInput.nativeElement.value = "";
          }
          this.monitor.removeProcess();
        });
    }
  }

  deleteImageFile(index: number) {
    if (!this.value)
      return;
    
    this.value.splice(index, 1);
    this.changeDetector.detectChanges();

    this.onChange(this.value);
    this.markAsTouched();
  }
}