import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-gallery-item',
  templateUrl: './image-gallery-item.component.html',
  styleUrls: ['./image-gallery-item.component.css'],
})
export class ImageGalleryItemComponent implements OnInit {
  constructor() {}

  @Input('preview-src') previewSrc: string = '';
  @Input() src: string = '';

  ngOnInit(): void {}
}
