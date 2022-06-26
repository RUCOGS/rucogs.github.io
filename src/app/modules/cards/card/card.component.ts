import { Attribute, Component, Input, OnInit, Optional } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  @Input() color: string = 'blank';
  @Input() hover: string = '';
  outlined: boolean;

  constructor(@Optional() @Attribute('outlined') outlined: any) {
    this.outlined = outlined != undefined;
  }

  ngOnInit(): void {}
}
