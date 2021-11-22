import { Attribute, Component, Input, OnInit, Optional } from '@angular/core';
import { Router } from '@angular/router';
import { Color } from '@app/utils/color';

@Component({
  selector: 'app-text-button',
  templateUrl: './text-button.component.html',
  styleUrls: ['./text-button.component.css']
})
export class TextButtonComponent implements OnInit {

  @Input() width: number = -1;
  @Input() color: string = "primary";
  @Input() iconifyIcon: string = "ant-design:mail-filled";
  @Input() link: string = "";
  @Input() target: string = "_self";
  
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
  }
}
