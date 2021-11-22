import { Component, OnInit, Input, Optional, Attribute } from '@angular/core';
import { Router } from '@angular/router';
import { BaseButtonComponent } from '@app/utils/basebutton';
import { Color } from "@utils/color";

// TODO: Make button use scss for custom colors instead of directly passing in a color.

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent extends BaseButtonComponent {

  @Input() iconifyIcon: string = "";

  hover: boolean = false;
  pressed: boolean = false;
  
  outline: string;

  constructor(
    router: Router,
    @Optional() @Attribute('route') route: any,

    @Optional() @Attribute('outlined') outlined: any,
    @Optional() @Attribute('outlined-contrast') outlinedContrast: any) {
    super(router, route);
    
    this.outline = "";
    if (outlined != undefined)
      this.outline = "outlined";
    else if (outlinedContrast != undefined)
      this.outline = "outlined contrast";
  }

  ngOnInit(): void {
  }
}