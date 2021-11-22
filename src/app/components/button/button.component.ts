import { Component, OnInit, Input, Optional, Attribute } from '@angular/core';
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
  @Input() iconifyIcon: string = "";
  @Input() link: string = "";
  @Input() target: string = "_self";

  hover: boolean = false;
  pressed: boolean = false;
  
  outline: string;

  constructor(
    @Optional() @Attribute('outlined') outlined: any,
    @Optional() @Attribute('outlined-contrast') outlinedContrast: any) {
    this.outline = "";
    if (outlined != undefined)
      this.outline = "outlined";
    else if (outlinedContrast != undefined)
      this.outline = "outlined contrast";
  }

  ngOnInit(): void {
  }

  onClick(): void {
    this.pressed = false;
    window.open(this.link, this.target);
  }
}