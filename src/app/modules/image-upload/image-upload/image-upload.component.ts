import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FileUtils } from '@src/app/utils/_utils.module';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Output() processing: boolean = false;
  @Output() changed = new EventEmitter<File>();
  @Output() deleted = new EventEmitter();

  @Input() fileSizeLimitMB: number = 10;
  @Input() imageSrc: string = "";
  @Input() value?: File;
  @Input() disabled = false;
  @Input() edited = false;

  constructor() { }

  ngOnInit(): void {}
  
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
      FileUtils.ReadAsBase64(file)
        .then(result => {
          // Limit file size
          const filesize = FileUtils.ByteToMB(FileUtils.Base64ToByteSize(result));
          if (filesize < this.fileSizeLimitMB) {
            this.value = file;
            this.imageSrc = result;
            this.edited = true;
            this.changed.emit(this.value);
          } else {
            // TODO: Make popup for errors
            console.log(`File size is too big! ${filesize}MB > ${this.fileSizeLimitMB}MB`);
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
