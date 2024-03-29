import { Component, Input, OnInit } from '@angular/core';
import {
  PicturesPageImages,
  PicturesPageImagePreviewsDir,
  PicturesPageImagesDir,
} from '@app/settings/_settings.module';
import { ImageInfo } from '@app/classes/_classes.module';

const PicturesPageImagesReversed = [...PicturesPageImages].reverse();

@Component({
  selector: 'app-pictures-page',
  templateUrl: './pictures-page.component.html',
  styleUrls: ['./pictures-page.component.css'],
  host: {
    class: 'page',
  },
})
export class PicturesPageComponent implements OnInit {
  // Show the most recent stuff first
  images: ImageInfo[] = PicturesPageImagesReversed;
  imagesDir: string = PicturesPageImagesDir;
  previewsDir: string = PicturesPageImagePreviewsDir;

  constructor() {}

  ngOnInit(): void {}
}
