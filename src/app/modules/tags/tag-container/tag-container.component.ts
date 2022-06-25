import { Attribute, Component, HostBinding, Input, OnInit, Optional } from '@angular/core';

@Component({
  selector: 'app-tag-container',
  templateUrl: './tag-container.component.html',
  styleUrls: ['./tag-container.component.css']
})
export class TagContainerComponent implements OnInit {

  @Input() center: boolean = false;

  @HostBinding('style.justify-content') justifyContent;

  ngOnInit(): void {
    if (this.center)
      this.justifyContent = "center";
  }
}
