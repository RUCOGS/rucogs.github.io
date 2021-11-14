import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { Breakpoints } from '@app/utils/breakpoints';

@Injectable({
  providedIn: 'root'
})
export class BreakpointManagerService {

  currentBreakpoint: string;

  constructor(private breakpointObserver: BreakpointObserver) { 
    if (this.breakpointObserver.isMatched(Breakpoints.Mobile))
      this.currentBreakpoint = "mobile";
    this.currentBreakpoint = "desktop";
    
    this.breakpointObserver.observe(Breakpoints.Desktop).subscribe((state: BreakpointState) => {
      if (state.matches)
        this.currentBreakpoint = "desktop";
      else
        this.currentBreakpoint = "mobile";
    });
  }
}
