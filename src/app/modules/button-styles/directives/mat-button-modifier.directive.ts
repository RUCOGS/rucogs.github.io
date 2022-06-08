import { Attribute, Directive, ElementRef, Input, OnInit, Optional } from '@angular/core';

@Directive({
  selector: '[mat-button], [mat-raised-button], [mat-stroked-button], [mat-flat-button]'
})
export class MatButtonModifierDirective implements OnInit {

  @Input('color') color: string = "";
  @Input('text-color') textColor: string = "";
  tallButton: boolean;
  roundTopLeft: boolean;
  roundTopRight: boolean;
  roundBottomLeft: boolean;
  roundBottomRight: boolean;
  pill: boolean;
  fab: boolean;

  constructor(
    private el: ElementRef,
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('fab') fab: any,
    @Optional() @Attribute('tall-button') tallButton: any,
    @Optional() @Attribute('round-tl') roundTopLeft: any,
    @Optional() @Attribute('round-tr') roundTopRight: any,
    @Optional() @Attribute('round-bl') roundBottomLeft: any,
    @Optional() @Attribute('round-br') roundBottomRight: any) {
    this.tallButton = tallButton != undefined;
    this.fab = fab != undefined;
    this.pill = pill != undefined;
    this.roundTopLeft = roundTopLeft != undefined;
    this.roundTopRight = roundTopRight != undefined;
    this.roundBottomLeft = roundBottomLeft != undefined;
    this.roundBottomRight = roundBottomRight != undefined;
  }

  ngOnInit() {
    // Avoids race condition of last being added after construction (ie. when using ngIf, etc.).
    this.tallButton = this.el.nativeElement.hasAttribute('tall-button');
    this.pill = this.el.nativeElement.hasAttribute('pill');

    const themeColors = ['', 'basic','primary', 'accent', 'warn', ]
    if (!themeColors.includes(this.color)) {
      this.el.nativeElement.style.backgroundColor = this.color;
      if (this.textColor)
        this.el.nativeElement.style.color = this.textColor;
    }

    if (this.tallButton)
      this.el.nativeElement.style.height = "3em";

    if (this.pill)
      this.el.nativeElement.style.borderRadius = "100%";

    if (this.fab) {
      this.el.nativeElement.style.padding = "0px";
      this.el.nativeElement.style.minWidth = this.el.nativeElement.style.width;
      this.el.nativeElement.style.borderRadius = "100%";
    }

    if (this.roundTopLeft)
      this.el.nativeElement.style.borderTopLeftRadius = "2em";
    if (this.roundTopRight)
      this.el.nativeElement.style.borderTopRightRadius = "2em";
    if (this.roundBottomLeft)
      this.el.nativeElement.style.borderBottomLeftRadius = "2em";
    if (this.roundBottomLeft)
      this.el.nativeElement.style.borderBottomLeftRadius = "2em";
  }
}