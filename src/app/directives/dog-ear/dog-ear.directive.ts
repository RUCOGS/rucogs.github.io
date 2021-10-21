import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDogEar]'
})
export class DogEarDirective {
  el: ElementRef;
  constructor(el: ElementRef) {
    this.el = el;
  }
  ngAfterViewInit() {
    (this.el.nativeElement.querySelector('.bg') as HTMLInputElement).style.borderTopLeftRadius = "32px";
  }
}
