import { Component, Input, OnInit, Output } from '@angular/core';
import { FileUtils } from '@src/app/utils/_utils.module';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  @Output() processing: boolean = false;

  @Input() fileSizeLimitMB: number = 10;
  @Input() imageSrc: string = "";
  @Input() value?: File;
  @Input() disabled = false;

  constructor() { }

  ngOnInit(): void {}
  
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
