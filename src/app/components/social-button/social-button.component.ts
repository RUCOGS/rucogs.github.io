import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-social-button',
  templateUrl: './social-button.component.html',
  styleUrls: ['./social-button.component.css']
})
export class SocialButtonComponent implements OnInit {

  @Input() icon: string = "";
  @Input() username: string = "";
  @Input() link: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    window.open(this.link, '_blank');
  }
}
