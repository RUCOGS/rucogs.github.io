import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-page-header',
  templateUrl: './full-page-header.component.html',
  styleUrls: ['./full-page-header.component.css']
})
export class FullPageHeaderComponent implements OnInit {
  
  @Input() bgImage: string = "";
  @Input() color: string = "";
  @Input() textColor: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  getBgStyle(): Object {
    return { 
      'background-color': this.color,
      'background-image': 'linear-gradient(to bottom, ' + this.color + ', #00000000), url(' + this.bgImage + ')',
    }
  }

}
