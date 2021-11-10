import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-site-header',
  templateUrl: './site-header.component.html',
  styleUrls: ['./site-header.component.css']
})
export class SiteHeaderComponent implements OnInit {

  scrolled: boolean = false;

  constructor() { }

  ngOnInit(): void {
    
  }

  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll() {
    this.scrolled = (window.pageYOffset != 0);
  }
}
