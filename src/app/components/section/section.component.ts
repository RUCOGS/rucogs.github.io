import { Component, OnInit, Input, Attribute, Optional, ElementRef } from '@angular/core';

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
  shadow: boolean;

  constructor(
    private elementRef: ElementRef,
    @Optional() @Attribute('last') last: any,
    @Optional() @Attribute('dog-ear') dogEar: any,
    @Optional() @Attribute('full-page') fullPage: any,
    @Optional() @Attribute('shadow') shadow: any) {
    this.last = last != undefined;
    this.dogEar = dogEar != undefined;
    this.fullPage = fullPage != undefined;
    this.shadow = shadow != undefined;
  }

  ngOnInit(): void {
    // Avoids race condition of last being added after construction (ie. when using ngIf, etc.).
    this.last = this.elementRef.nativeElement.hasAttribute("last");
    this.dogEar = this.elementRef.nativeElement.hasAttribute("dog-ear");
    this.fullPage = this.elementRef.nativeElement.hasAttribute("full-page");
    this.shadow = this.elementRef.nativeElement.hasAttribute("shadow");
  }
}