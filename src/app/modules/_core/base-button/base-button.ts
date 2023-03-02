import { Attribute, Directive, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { Router } from '@angular/router';

@Directive()
export class BaseButtonComponent implements OnInit {
  @Input() width: number = -1;
  @Input() color: string = 'primary';
  @Input() link: string = '';
  @Input() target: string = '_blank';

  @Output() click = new EventEmitter();

  route: boolean = false;

  constructor(private router: Router, @Optional() @Attribute('route') route: any) {
    this.route = route != undefined;
  }

  ngOnInit(): void {}

  isValidUrl(urlString: string): boolean {
    try {
      return Boolean(new URL(urlString));
    } catch (e) {
      return false;
    }
  }

  onClick(): void {
    if (!this.isValidUrl(this.link) && this.route) this.router.navigateByUrl(this.link);
    else window.open(this.link, this.target);
    this.click.emit();
  }
}
