import { Component, Input, OnInit } from '@angular/core';
import { PageLink } from '@src/app/classes/pagelink';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.css']
})
export class HamburgerMenuComponent implements OnInit {

  @Input() pageLinks: PageLink[] = [];

  expanded: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }
}
