import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { Breakpoint, BreakpointsData } from '@app/settings/_settings.module';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointManagerService implements OnDestroy {

  get currentBreakpoint(): Breakpoint {
    for (let i = 0; i < this.breakpointsMatched.length - 1; i++) {
      if (this.breakpointsMatched[i])
        return BreakpointsData[i].name;
    }
    return BreakpointsData[BreakpointsData.length - 1].name;
  }

  private breakpointsMatched: boolean[] = [];
  private onDestroy$ = new Subject<void>();

  constructor(private breakpointObserver: BreakpointObserver) {
    for (let i = 0; i < BreakpointsData.length - 1; i++) {
      this.breakpointObserver.observe(BreakpointsData[i].query)
        .pipe(takeUntil(this.onDestroy$))
        .subscribe((state: BreakpointState) => {
          this.breakpointsMatched[i] = state.matches;
        });
    }
    // Last element is the default and will always be matched.
    this.breakpointsMatched.push(true);
  }

  matchedBreakpointOrBelow(breakpoint: Breakpoint) {
    const index = BreakpointsData.findIndex(x => x.name === breakpoint);
    return this.breakpointsMatched[index];
  }

  matchedBreakpointRange(start: Breakpoint, end: Breakpoint) {
    let startIndex = BreakpointsData.findIndex(x => x.name === start);
    let endIndex = BreakpointsData.findIndex(x => x.name === end);
    if (startIndex > endIndex) {
      // Swap if they are mismatched
      let temp = start;
      start = end;
      end = temp;
    }
    return this.matchedBreakpointOrAbove(start) && this.matchedBreakpointOrBelow(end);
  }

  matchedBreakpointOrAbove(breakpoint: Breakpoint) {
    const index = BreakpointsData.findIndex(x => x.name === breakpoint);
    if (index > 1)
      if (this.breakpointsMatched[index - 1])
        return false;
    return this.breakpointsMatched[index];
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
