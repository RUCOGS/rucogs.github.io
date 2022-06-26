import { ChangeDetectionStrategy, Component, HostListener, Input } from '@angular/core';
import { BreakpointManagerService } from '@src/app/services/breakpoint-manager.service';

import { ZOOM_ANIMATION } from './scrollspy-nav-layout.animation';

@Component({
  animations: [ZOOM_ANIMATION],
  selector: 'app-scrollspy-nav-layout',
  templateUrl: './scrollspy-nav-layout.component.html',
  styleUrls: ['./scrollspy-nav-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScrollspyNavLayoutComponent {
  @Input()
  headings: Element[] | undefined;

  showScrollUpButton = false;

  constructor(public breakpointManager: BreakpointManagerService) {}

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.showScrollUpButton = Math.ceil(window.pageYOffset) > 64;
  }

  onScrollUp(): void {
    window.scrollTo(0, 0);
    location.hash = '';
  }
}
