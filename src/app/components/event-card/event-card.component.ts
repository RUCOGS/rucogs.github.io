import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.css']
})
export class EventCardComponent implements OnInit {

  constructor() { }

  @Input() date: string = "";
  @Input() title: string = "";
  @Input() time: string = "";
  @Input() type: string = "In-person";

  ngOnInit(): void {
  }

}
