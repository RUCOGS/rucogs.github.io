import { Component, Input, OnInit } from '@angular/core';
import { PicturePageImages, ImageInfo} from '@utils/picture-page-images'

@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css'],
  host: {
    class: 'page'
  }
})
export class PicturesComponent implements OnInit {

  images: ImageInfo[] = PicturePageImages;

  constructor() { 
  
  }

  ngOnInit(): void {
  }

}
