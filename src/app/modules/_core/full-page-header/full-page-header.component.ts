import { Component, ElementRef, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-full-page-header',
  templateUrl: './full-page-header.component.html',
  styleUrls: ['./full-page-header.component.css'],
})
export class FullPageHeaderComponent implements OnInit {
  @Input() bgImage: string = '';
  @Input() color: string = 'primary';
  @Input() bgRepeatMode: string = '';
  @Input() bgPosition: string = '';
  @Input() gradient: boolean = true;
  @Input() fgColor: string = '';

  constructor() {}

  ngOnInit(): void {}

  getBgStyle(): Object {
    return {
      'background-image':
        (this.gradient ? 'linear-gradient(to bottom, var(--background-color), #00000000),' : '') +
        ' url(' +
        this.bgImage +
        ')',
      ...(this.bgRepeatMode !== '' && { 'background-repeat': this.bgRepeatMode, 'background-size': 'auto' }),
      ...(this.bgPosition !== '' && { 'background-position': this.bgPosition }),
      ...(this.color == 'none' && { 'background-color': 'none' }),
    };
  }

  getIconClass(): Object {
    return {
      [this.fgColor]: true,
    };
  }
}
