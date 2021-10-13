import { Component, OnInit, Input } from '@angular/core';
import { Color } from '../color';

// TODO: Update angular on wifi with `ng update`
// TODO: Download angular material on wifi with `ng add @angular/material`

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() width: number = -1;
  @Input() backgroundColorHex: string = "#B3002D";
  @Input() pressedColorHex?: string;
  @Input() hoverColorHex?: string;
  @Input() iconifyIcon: string = "ant-design:mail-filled";
  @Input() text: string = "Button";
  
  backgroundColor?: Color;
  pressedColor?: Color;
  hoverColor?: Color;
  

  hover: boolean = false;
  pressed: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.backgroundColor = Color.fromHex(this.backgroundColorHex);

    if (this.pressedColorHex != null)
      this.pressedColor = Color.fromHex(this.pressedColorHex);
    else
      this.pressedColor = this.backgroundColor.copy();

    if (this.hoverColorHex != null)
      this.hoverColor = Color.fromHex(this.hoverColorHex);
    else
      this.hoverColor = this.backgroundColor.shade(0.2);
  }

  getCurrentStyle(): Object {
    return {
      'transition': '0.1s',
      'background-color': (this.pressed ? this.pressedColor?.hexString() : (this.hover ? this.hoverColor?.hexString() : this.backgroundColor?.hexString())),
      ...(this.width > 0 && {'width': this.width}),
    };
  }
}