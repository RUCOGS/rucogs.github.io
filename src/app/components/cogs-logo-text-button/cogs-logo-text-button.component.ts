import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cogs-logo-text-button',
  templateUrl: './cogs-logo-text-button.component.html',
  styleUrls: ['./cogs-logo-text-button.component.css']
})
export class CogsLogoTextButtonComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    window.open("home", "_self");
  }
}
