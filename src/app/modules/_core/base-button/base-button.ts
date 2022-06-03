import { Attribute, Component, EventEmitter, Input, OnInit, Optional, Output } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  template: ''
})
export class BaseButtonComponent implements OnInit {

  @Input() width: number = -1;
  @Input() color: string = "primary";
  @Input() link: string = "";
  @Input() target: string = "_self";

  @Output() click = new EventEmitter();
  
  route: boolean = false;

  constructor(
    private router: Router,
    @Optional() @Attribute('route') route: any) {
    this.route = route != undefined;
  }

  ngOnInit(): void {
  }

  onClick(): void {
    if (this.route)
      this.router.navigateByUrl(this.link);
    else
      window.open(this.link, this.target);
    this.click.emit();
  }
}
