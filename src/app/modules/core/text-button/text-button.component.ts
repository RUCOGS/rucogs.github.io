import { Attribute, Component, Input, OnInit, Optional, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BaseButtonComponent } from '@app/utils/basebutton';
import { Color } from '@app/utils/color';

@Component({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.css']
})
export class TextButtonComponent extends BaseButtonComponent {

}
