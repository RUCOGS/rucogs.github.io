import { Component, ElementRef } from '@angular/core';
import { SettingsService } from '@src/_settings';
import { IconService } from '@visurel/iconify-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cogs';
  showSidebars = false;
  
  constructor(
    private elementRef: ElementRef,
    private iconService: IconService,
    private settings: SettingsService
  ) {
    iconService.registerAll(settings.General.icons);
    this.updateStyleVars();
  }
  
  updateStyleVars() {
    if (this.showSidebars) {
      this.elementRef.nativeElement.style.setProperty('--main-width', `min(80%, 1080px)`);
      this.elementRef.nativeElement.style.setProperty('--content-width', `100%`);
    } else {
      this.elementRef.nativeElement.style.setProperty('--main-width', `unset`);
      this.elementRef.nativeElement.style.setProperty('--content-width', `unset`);
    }
  }

  getOutletContainerStyle() {
    if (this.showSidebars)
      return {
        'flex-basis': 'var(--main-width)'
      };
    return {
      'width': '100%'
    };
  }
}
