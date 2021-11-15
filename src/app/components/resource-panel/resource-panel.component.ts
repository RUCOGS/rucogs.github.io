import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-panel',
  templateUrl: './resource-panel.component.html',
  styleUrls: ['./resource-panel.component.css']
})
export class ResourcePanelComponent implements OnInit {

  constructor() { }

  @Input() iconifyIcon: string = "";
  @Input() title: string = "";

  ngOnInit(): void {
  }

}
