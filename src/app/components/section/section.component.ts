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
  fullPage: boolean;

  constructor(
    @Optional() @Attribute('last') last: any,
    @Optional() @Attribute('dog-ear') dogEar: any,
    @Optional() @Attribute('full-page') fullPage: any) {
    this.last = last != undefined;
    this.dogEar = dogEar != undefined;
    this.fullPage = fullPage != undefined;
  }

  ngOnInit(): void {}
}
