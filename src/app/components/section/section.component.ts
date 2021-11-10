import { Component, OnInit, Input, Attribute, Optional } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() title: string = "";
  @Input() color: string = "";
  @Input() textColor: string = "";
  
  last: boolean;

  constructor(@Optional() @Attribute('last') last: any) {
    this.last = last == undefined;
  }

  ngOnInit(): void {
    console.log(this.last);
  }

  getBottomStyle(): Object {
    return { 
      'background-color': this.color,
      ...(!this.last && {'height': '0px'}), 
    };
  }
}
