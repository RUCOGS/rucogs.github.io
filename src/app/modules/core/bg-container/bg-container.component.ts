import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bg-container',
  templateUrl: './bg-container.component.html',
  styleUrls: ['./bg-container.component.css']
})
export class BgContainerComponent implements OnInit {

  @Input() color: string = "primary";
  
  constructor() { }

  ngOnInit(): void {
  }
}
