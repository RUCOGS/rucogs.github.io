import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.css']
})
export class CardGridComponent implements OnInit {
  
  @HostBinding('style.grid-template-columns')
  gridTemplateColumns: string = 'repeat( auto-fit, minmax(250px, 1fr) )';
  
  constructor() { }

  ngOnInit(): void {
  }

}
