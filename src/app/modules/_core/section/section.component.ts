import { Attribute, Component, ElementRef, Input, OnInit, Optional } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css'],
})
export class SectionComponent implements OnInit {
  @Input() title: string = '';
  @Input() color: string = 'blank';
  @Input() bgImage: string = '';
  @Input() bgRepeatMode: string = '';
  @Input() bgPosition: string = '';

  last: boolean;
  dogEar: boolean;
  fullPage: boolean;
  fullWidth: boolean;
  shadow: boolean;
  bottomGradient: boolean;
  topGradient: boolean;

  constructor(
    private elementRef: ElementRef,
    @Optional() @Attribute('last') last: any,
    @Optional() @Attribute('dog-ear') dogEar: any,
    @Optional() @Attribute('full-page') fullPage: any,
    @Optional() @Attribute('full-width') fullWidth: any,
    @Optional() @Attribute('shadow') shadow: any,
    @Optional() @Attribute('top-gradient') topGradient: any,
    @Optional() @Attribute('bottom-gradient') bottomGradient: any,
  ) {
    this.last = last != undefined;
    this.dogEar = dogEar != undefined;
    this.fullPage = fullPage != undefined;
    this.fullWidth = fullWidth != undefined;
    this.shadow = shadow != undefined;
    this.bottomGradient = bottomGradient != undefined;
    this.topGradient = topGradient != undefined;
  }

  ngOnInit(): void {
    // Avoids race condition of last being added after construction (ie. when using ngIf, etc.).
    this.last = this.elementRef.nativeElement.hasAttribute('last');
    this.dogEar = this.elementRef.nativeElement.hasAttribute('dog-ear');
    this.fullPage = this.elementRef.nativeElement.hasAttribute('full-page');
    this.fullWidth = this.elementRef.nativeElement.hasAttribute('full-width');
    this.shadow = this.elementRef.nativeElement.hasAttribute('shadow');
  }

  //transparent-background-color
  getBgStyle(): Object {
    let gradient = '';
    if (this.topGradient || this.bottomGradient) {
      gradient =
        'linear-gradient(' +
        (this.topGradient ? 'var(--background-color),' : '') +
        '#00000000' +
        (this.bottomGradient ? ', var(--background-color)' : '') +
        '),';
    }
    return {
      ...(this.bgImage && {
        'background-image': gradient + 'url(' + this.bgImage + ')',
      }),
      ...(this.bgRepeatMode !== '' && { 'background-repeat': this.bgRepeatMode, 'background-size': 'auto' }),
      ...(this.bgPosition !== '' && { 'background-position': this.bgPosition }),
      ...(this.color == 'none' && { 'background-color': 'none' }),
    };
  }
}
