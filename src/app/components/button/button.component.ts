import { Component, OnInit, Input } from '@angular/core';
import { Color } from "@utils/color";

// TODO: Update angular on wifi with `ng update`
// TODO: Download angular material on wifi with `ng add @angular/material`

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {

  @Input() width: number = -1;
  @Input('background-color') backgroundColorText: string = "#B3002D";
  @Input('pressed-color') pressedColorText?: string;
  @Input('hover-color') hoverColorText?: string;
  @Input() iconifyIcon: string = "ant-design:mail-filled";
  @Input() text: string = "Button";
  @Input() link: string = "";
  
  backgroundColor?: Color;
  pressedColor?: Color;
  hoverColor?: Color;
  
  hover: boolean = false;
  pressed: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log("trying fromText on '" + this.backgroundColorText + "'");
    this.backgroundColor = Color.fromTextOrDefault(this.backgroundColorText);

    if (this.pressedColorText != null)
      this.pressedColor = Color.fromTextOrDefault(this.pressedColorText);
    else
      this.pressedColor = this.backgroundColor.copy();

    if (this.hoverColorText != null)
      this.hoverColor = Color.fromTextOrDefault(this.hoverColorText);
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

  onMouseUp(): void {
    this.pressed = false;
    if (this.link != "")
      window.open(this.link, "_blank");
  }
}