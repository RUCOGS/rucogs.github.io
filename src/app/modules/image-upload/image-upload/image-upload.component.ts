import { FocusMonitor } from '@angular/cdk/a11y';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { ProcessMonitor } from '@src/app/classes/process-monitor';
import { DataSize, FileUtils } from '@src/app/utils/_utils.module';
import { BaseCustomInputComponent } from '../../base-custom-input/base-custom-input.module';
import { UIMessageService } from '../../ui-message/ui-message.module';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: ImageUploadComponent,
    },
  ],
})
export class ImageUploadComponent extends BaseCustomInputComponent<File> implements OnInit {
  @Input() fileSizeLimit: string = '10 MB';
  @Input() imageSrc: string = '';
  @Input() edited = false;

  monitor = new ProcessMonitor();
  fileSizeLimitBytes: number = 0;

  constructor(
    private uiMessageService: UIMessageService,
    private changeDetector: ChangeDetectorRef,

    focusMonitor: FocusMonitor,
    elementRef: ElementRef,
    @Optional() @Self() ngControl: NgControl,
  ) {
    super(focusMonitor, elementRef, ngControl);
  }

  ngOnInit(): void {
    const args = this.fileSizeLimit.split(' ');
    this.fileSizeLimitBytes = FileUtils.byteStringToBytes(this.fileSizeLimit);
  }

  init(imageSrc: string) {
    this.imageSrc = imageSrc;
    this.edited = false;
    this.value = null;
  }

  onDeleteClicked() {
    this.value = null;
    this.edited = true;
    this.imageSrc = '';
  }

  onImageFileChanged(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      this.monitor.addProcess();
      this.changeDetector.detectChanges();
      FileUtils.readAsBase64(file)
        .then((result) => {
          // Limit file size
          const filesize = file.size;
          if (filesize < this.fileSizeLimitBytes) {
            this.value = file;
            this.imageSrc = result;
            this.edited = true;
          } else {
            this.uiMessageService.error(
              `File size is too big! ${FileUtils.byteSizeToString(filesize)} > ${FileUtils.byteSizeToString(
                this.fileSizeLimitBytes,
              )}`,
            );
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          this.monitor.removeProcess();
        });
    }
  }
}
