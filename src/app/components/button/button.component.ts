import { Component, OnInit, Input } from '@angular/core';
import { Color } from "@utils/color";

// TODO: Make button use scss for custom colors instead of directly passing in a color.

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() width: number = -1;
  @Input() color: string = "primary";
  @Input() iconifyIcon: string = "ant-design:mail-filled";
  @Input() text: string = "Button";
  @Input() link: string = "";
  @Input() target: string = "_self";
  
  hover: boolean = false;
  pressed: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  onMouseUp(): void {
    this.pressed = false;
    window.open(this.link, this.target);
  }
}