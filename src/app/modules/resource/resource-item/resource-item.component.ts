import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-resource-item',
  templateUrl: './resource-item.component.html',
  styleUrls: ['./resource-item.component.css'],
})
export class ResourceItemComponent implements OnInit {
  constructor() {}

  @Input() type: string = 'article';
  @Input() href: string = '';

  ngOnInit(): void {}

  getIcon(): string {
    switch (this.type) {
      case 'article':
        return 'article';
      case 'video':
        return 'video';
      case 'tutorial':
        return 'tutorial';
      default:
        return '';
    }
  }

  onClick() {
    window.open(this.href, '_blank');
  }
}
