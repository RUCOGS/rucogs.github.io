import { Component, Input, OnInit } from '@angular/core';
import { PageLink } from '@app/utils/pagelink';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent implements OnInit {

  @Input() pageLinks: PageLink[] = [];

  constructor() { }

  expanded: boolean = false;

  ngOnInit(): void {
  }
}
