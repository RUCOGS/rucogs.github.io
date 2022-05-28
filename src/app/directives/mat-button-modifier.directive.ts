import { Attribute, Directive, ElementRef, Input, OnInit, Optional } from '@angular/core';

@Directive({
  selector: '[mat-button], [mat-raised-button], [mat-stroked-button], [mat-flat-button]'
})
export class MatButtonModifierDirective implements OnInit {

  @Input('color') color: string = "";
  @Input('text-color') textColor: string = "";
  tallButton: boolean;
  pill: boolean;

  constructor(
    private el: ElementRef,
    @Optional() @Attribute('pill') pill: any,
    @Optional() @Attribute('tall-button') tallButton: any) {
    this.tallButton = tallButton != undefined;
    this.pill = pill != undefined;
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

    if (this.tallButton) {
      this.el.nativeElement.style.height = "3em";
    }

    if (this.pill) {
      this.el.nativeElement.style.borderRadius = "2em"
    }
  }
}