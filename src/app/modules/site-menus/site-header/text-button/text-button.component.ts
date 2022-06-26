import { Component } from '@angular/core';
import { BaseButtonComponent } from '@src/app/modules/_core/base-button/base-button';

@Component({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.css'],
})
export class TextButtonComponent extends BaseButtonComponent {}
