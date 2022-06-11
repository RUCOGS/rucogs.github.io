import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUtils } from '@src/app/utils/_utils.module';
import { UIMessageService } from '../../ui-message/ui-message.module';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Output() processing: boolean = false;
  @Output() changed = new EventEmitter<File>();
  @Output() deleted = new EventEmitter();

  @Input() fileSizeLimit: string = "10 MB";
  @Input() imageSrc: string = "";
  @Input() value?: File;
  @Input() disabled = false;
  @Input() edited = false;

  fileSizeLimitBytes: number = 0;

  constructor(private uiMessageService: UIMessageService) { }

  ngOnInit(): void {
    const args = this.fileSizeLimit.split(' ');
    this.fileSizeLimitBytes = parseFloat(args[0]);
    switch(args[1].toUpperCase()) {
      case "GB":
        this.fileSizeLimitBytes *= 1_000_000_000;
        break;
      case "MB":
        this.fileSizeLimitBytes *= 1_000_000;
        break; 
      case "KB":
        this.fileSizeLimitBytes *= 1_000;
        break;
    }
  }
  
  init(imageSrc: string) {
    this.imageSrc = imageSrc;
    this.edited = false;
    this.value = undefined;
  }

  onDeleteClicked() {
    this.value = undefined;
    this.edited = true;
    this.imageSrc = "";
    this.changed.emit(this.value);
    this.deleted.emit();
  }

  onImageFileChanged(event: any) {
    const file: File = event.target.files[0];
    
    if (file) {
      this.processing = true;
      FileUtils.readAsBase64(file)
        .then(result => {
          // Limit file size
          const filesize = FileUtils.base64ToByteSize(result);
          if (filesize < this.fileSizeLimitBytes) {
            this.value = file;
            this.imageSrc = result;
            this.edited = true;
            this.changed.emit(this.value);
          } else {
            this.uiMessageService.error(`File size is too big! ${FileUtils.byteSizeToString(filesize)} > ${FileUtils.byteSizeToString(this.fileSizeLimitBytes)}`);
          }
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.processing = false;
        });
    }
  }
}
