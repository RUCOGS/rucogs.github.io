import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() title: string = "";
  @Input() color: string = "";
  @Input() textColor: string = "";

  constructor() { }

  ngOnInit(): void {
  }

}
