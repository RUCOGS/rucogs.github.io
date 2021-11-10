import { Component, Input, OnInit } from '@angular/core';
import { Color } from '@app/utils/color';

@Component({
  selector: 'app-horizontal-menu-button',
  templateUrl: './horizontal-menu-button.component.html',
  styleUrls: ['./horizontal-menu-button.component.css']
})
export class HorizontalMenuButtonComponent implements OnInit {

  @Input() width: number = -1;
  @Input('color') colorText: string = "var(--light)";
  @Input('pressed-color') pressedColorText?: string;
  @Input('hover-color') hoverColorText?: string;
  @Input() iconifyIcon: string = "ant-design:mail-filled";
  @Input() text: string = "Button";
  @Input() link: string = "";
  
  color?: Color;
  pressedColor?: Color;
  hoverColor?: Color;
  
  hover: boolean = false;
  pressed: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.color = Color.fromTextOrDefault(this.colorText);

    if (this.pressedColorText != null)
      this.pressedColor = Color.fromTextOrDefault(this.pressedColorText);
    else
      this.pressedColor = this.color.copy();

    if (this.hoverColorText != null)
      this.hoverColor = Color.fromTextOrDefault(this.hoverColorText);
    else
      this.hoverColor = this.color.shade(-0.2);
  }

  getCurrentStyle(): Object {
    return {
      'transition': '0.1s',
      'color': (this.pressed ? this.pressedColor?.hexString() : (this.hover ? this.hoverColor?.hexString() : this.color?.hexString()))
    };
  }

  onMouseUp(): void {
    this.pressed = false;
    if (this.link != "")
      window.location.href = this.link;
  }
}
