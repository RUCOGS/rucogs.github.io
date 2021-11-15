import { Component, HostBinding, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.css']
})
export class CardGridComponent implements OnInit {
  
  @Input('column-width') columnWidth: string = "250px";
  @Input() columns: string = "auto-fit";

  @HostBinding('style.grid-template-columns')
  gridTemplateColumns: string = '';

  constructor() { }

  ngOnInit(): void {
    this.gridTemplateColumns = `repeat( ${this.columns}, minmax(${this.columnWidth}, 1fr) )`
  }

}
