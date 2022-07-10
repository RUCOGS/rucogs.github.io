import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Mixin } from 'ts-mixer';
import { WithDestroy } from '../classes/mixins';

@Injectable({
  providedIn: 'root',
})
export class OverlayService extends Mixin(WithDestroy) {
  onClick$ = new Subject<Event>();

  private clickEvent = (e: Event) => {
    this.onClick$.next(e);
  };

  constructor(@Inject(DOCUMENT) private document: Document) {
    super();
    this.document.addEventListener('click', this.clickEvent);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    this.document.removeEventListener('click', this.clickEvent);
  }
}
