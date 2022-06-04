import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable, OnDestroy } from '@angular/core';
import { Breakpoints } from '@app/settings/_settings.module';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BreakpointManagerService implements OnDestroy {

  currentBreakpoint: string;

  private onDestroy$ = new Subject<void>();

  constructor(private breakpointObserver: BreakpointObserver) { 
    if (this.breakpointObserver.isMatched(Breakpoints.Mobile))
      this.currentBreakpoint = "mobile";
    this.currentBreakpoint = "desktop";
    
    this.breakpointObserver.observe(Breakpoints.Desktop)
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((state: BreakpointState) => {
      if (state.matches)
        this.currentBreakpoint = "desktop";
      else
        this.currentBreakpoint = "mobile";
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
  }
}
