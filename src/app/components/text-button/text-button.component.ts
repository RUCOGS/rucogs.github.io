import { Component, Input, OnInit } from '@angular/core';
import { Color } from '@app/utils/color';

@Component({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.css']
})
export class TextButtonComponent implements OnInit {

  // TODO: Refactore to use scss for color

  @Input() width: number = -1;
  @Input() color: string = "primary";
  @Input() iconifyIcon: string = "ant-design:mail-filled";
  @Input() text: string = "Button";
  @Input() link: string = "";
  @Input() target: string = "_self";

  constructor() { }

  ngOnInit(): void {
  }

  onMouseUp(): void {
    window.open(this.link, this.target);
  }
}
