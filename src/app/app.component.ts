import { Component } from '@angular/core';
import { SettingsService } from '@src/_settings';
import { IconService } from '@visurel/iconify-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'cogs';
  
  constructor(
    private iconService: IconService,
    private settings: SettingsService
  ) {
    iconService.registerAll(settings.General.icons);
  }
}
