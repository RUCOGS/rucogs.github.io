import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-page-header',
  templateUrl: './full-page-header.component.html',
  styleUrls: ['./full-page-header.component.css']
})
// TODO: Refactor FullPageHeader to use material theme for colors instead CSS vars
export class FullPageHeaderComponent implements OnInit {
  
  @Input() bgImage: string = "";
  @Input() color: string = "primary";

  constructor() { }

  ngOnInit(): void {
  }

  getBgStyle(): Object {
    return { 
      'background-image': 'linear-gradient(to bottom, var(--background-color), #00000000), url(' + this.bgImage + ')',
    }
  }

}
