import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BreakpointManagerService } from '@src/app/services/breakpoint-manager.service';
import { Breakpoint } from '@src/app/settings/breakpoints';

@Component({
  selector: 'app-side-bar-button',
  templateUrl: './side-bar-button.component.html',
  styleUrls: ['./side-bar-button.component.css'],
})
export class SideBarButtonComponent {
  @Output() click = new EventEmitter();

  @Input() color: string = 'blank';
  @Input() name: string = '';
  @Input() icon: string = '';

  constructor(public breakpointManager: BreakpointManagerService) {}

  onClick() {
    this.click.emit();
  }
}
