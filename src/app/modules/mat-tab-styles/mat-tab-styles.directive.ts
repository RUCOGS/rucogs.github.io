import { Attribute, Directive, ElementRef, OnInit, Optional } from '@angular/core';

@Directive({
  selector: '[mat-tab-content-width]',
})
export class MatTabStylesDirective {
  contentWidth: boolean;

  constructor(private elementRef: ElementRef, @Optional() @Attribute('mat-tab-content-width') contentWidth: any) {
    this.elementRef.nativeElement.innerHTML;

    this.contentWidth = contentWidth != undefined;

    if (this.contentWidth) this.elementRef.nativeElement.style.width = 'min(100%, var(--content-width))';
  }
}
