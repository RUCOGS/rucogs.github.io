import { Component, OnInit, Input, Attribute, Optional } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() title: string = "";
  @Input() color: string = "blank";
  
  last: boolean;
  dogEar: boolean;

  constructor(
    @Optional() @Attribute('last') last: any,
    @Optional() @Attribute('dog-ear') dogEar: any) {
    this.last = last != undefined;
    this.dogEar = dogEar != undefined;
  }

  ngOnInit(): void {}
}
