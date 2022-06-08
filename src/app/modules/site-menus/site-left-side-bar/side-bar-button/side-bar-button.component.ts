import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreakpointManagerService } from '@src/app/services/breakpoint-manager.service';
import { Breakpoints } from '@src/app/settings/breakpoints';

@Component({
  selector: 'app-side-bar-button',
  templateUrl: './side-bar-button.component.html',
  styleUrls: ['./side-bar-button.component.css']
})
export class SideBarButtonComponent {

  @Output() click = new EventEmitter();

  @Input() color: string = "blank";
  @Input() name: string = "";
  @Input() icon: string = "";

  constructor(private breakpointManager: BreakpointManagerService) { }

  isDesktop() {
    return !this.isMobile();
  }

  isMobile() {
    return this.breakpointManager.currentBreakpoint === "mobile";
  }

  onClick() {
    this.click.emit();
  }
}
