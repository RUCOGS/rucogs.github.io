import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cogs-logo-text-button',
  templateUrl: './cogs-logo-text-button.component.html',
  styleUrls: ['./cogs-logo-text-button.component.css']
})
export class CogsLogoTextButtonComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onClick() {
    this.router.navigateByUrl("home");
  }
}
