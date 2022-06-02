import { EventEmitter, HostListener, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  scrolledToTop = new EventEmitter();
  scrolledToBottom = new EventEmitter();

  constructor() { 
    window.addEventListener('scroll', (event) => {      
      //In chrome and some browser scroll is given to body tag
      let pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.offsetHeight;
      let max = document.documentElement.scrollHeight;
      let min = document.documentElement.offsetHeight;
      // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
      if(pos == max) {
        this.scrolledToBottom.emit();
      }
      if (pos == min) {
        this.scrolledToTop.emit();
      }
    });
  }
}
