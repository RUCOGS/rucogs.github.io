import { Attribute, Component, ElementRef, EventEmitter, Input, OnInit, Optional, Output } from '@angular/core';
import { SettingsService } from '@src/_settings';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  @Output() click = new EventEmitter();

  @Input() color: string = "blank"
  @Input() size: string = "large";
  @Input() avatarSrc: string = "";

  borderWidth: number;
  clickable: boolean;
  clickableStyle: boolean;

  constructor(
    private elementRef: ElementRef,
    private settings: SettingsService,
    @Optional() @Attribute('border-width') borderWidth: any,
    @Optional() @Attribute('clickable') clickable: any,
    @Optional() @Attribute('clickable-style') clickableStyle: any,
  ) { 
    this.borderWidth = borderWidth ?? "4px";
    this.elementRef.nativeElement.style.setProperty('--border-width', this.borderWidth);
    this.clickable = clickable != undefined;
    this.clickableStyle = clickableStyle != undefined;
  }

  ngOnInit(): void {
  }

  getContainerClass() {
    return {
      [this.color]: true,
      [this.size]: true,
      'clickable': this.clickable || this.clickableStyle,
    }
  }

  getAvatarClass() {
    return {
      'clickable': this.clickable || this.clickableStyle,
    }
  }

  getAvatarSrc() {
    if (this.avatarSrc)
      return this.avatarSrc;
    return this.settings.General.defaultAvatarSrc;
  }

  getButtonStyle() {
    return {
      'background': `url(${this.getAvatarSrc()})`,
      'background-size': 'cover'
    }
  }

  onClick() {
    this.click.emit();
  }
}
