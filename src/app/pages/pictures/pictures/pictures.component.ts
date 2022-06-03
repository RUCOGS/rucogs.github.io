import { Component, Input, OnInit } from '@angular/core';
import { PicturesPageImages, PicturesPageImagePreviewsDir, PicturesPageImagesDir } from '@app/utils/pictures-page-images'
import { ImageInfo } from "@app/utils/image-info";

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css'],
  host: {
    class: 'page'
  }
})
export class PicturesComponent implements OnInit {

  images: ImageInfo[] = PicturesPageImages;
  imagesDir: string = PicturesPageImagesDir;
  previewsDir: string = PicturesPageImagePreviewsDir;

  constructor() { 
  
  }

  ngOnInit(): void {
  }

}
