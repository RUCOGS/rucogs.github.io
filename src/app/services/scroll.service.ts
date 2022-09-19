import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ScrollService {
  position: number = 0;
  maxPosition: number = 0;
  minPosition: number = 0;

  scrolledToTop = new EventEmitter();
  scrolledToBottom = new EventEmitter();

  constructor(private router: Router) {
    window.addEventListener('scroll', (event) => {
      this.updateScrollData();
    });
  }

  // TODO LATER: Find someway to detect scroll height change. So far it looks llike it's not possbile :/

  readonly marginOfError = 5;

  updateScrollData(emitEvent: boolean = true) {
    //In chrome and some browser scroll is given to body tag
    this.position = Math.round(document.documentElement.scrollTop + document.documentElement.offsetHeight);
    this.maxPosition = document.documentElement.scrollHeight;
    this.minPosition = document.documentElement.offsetHeight;

    if (emitEvent) {
      // pos/max will give you the distance between scroll bottom and and bottom of screen in percentage.
      if (this.maxPosition - this.position <= this.marginOfError) {
        this.scrolledToBottom.emit();
      }
      if (this.position - this.minPosition <= this.marginOfError) {
        this.scrolledToTop.emit();
      }
    }
  }

  isAtBottom() {
    return this.position - this.maxPosition;
  }

  isAtTop() {
    return this.position == this.minPosition;
  }
}
