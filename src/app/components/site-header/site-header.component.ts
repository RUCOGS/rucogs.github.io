import { Component, HostListener, OnInit } from '@angular/core';
import { BreakpointManagerService } from '@app/services/breakpoint-manager.service';
import { Breakpoints } from '@app/utils/breakpoints';
import { PageLink } from '@app/utils/pagelink';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {

  scrolled: boolean = false;
  breakpointState: string = "desktop";
  pageLinks: PageLink[] = [
    new PageLink("Home", "home"),
    new PageLink("Calendar", "calendar"),
    new PageLink("Projects", "projects"),
    new PageLink("Pictures", "pictures"),
    new PageLink("Resources", "resources"),
    new PageLink("Log in", "login"),
    new PageLink("Sign up", "signup")
    //new PageLink("Scarlet Game Jam", "scarlet-game-jam"),
  ];

  constructor(public breakpointManager: BreakpointManagerService) { }

  ngOnInit(): void {
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    this.scrolled = (window.pageYOffset != 0);
  }

  readProperty(): string {
      let bodyStyles = window.getComputedStyle(document.body);
      return bodyStyles.getPropertyValue('--screen-type');
  }
}
