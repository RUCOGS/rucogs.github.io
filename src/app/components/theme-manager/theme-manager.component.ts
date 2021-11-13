import { Component, HostBinding, OnInit } from '@angular/core';
import { ThemeManagerService } from '@app/services/theme-manager.service';

@Component({
  selector: 'app-theme-manager',
  templateUrl: './theme-manager.component.html',
  styleUrls: ['./theme-manager.component.css']
})
export class ThemeManagerComponent implements OnInit {

  constructor(private themeManagerService: ThemeManagerService) { }

  @HostBinding('class') classAttr: any;

  ngOnInit(): void {
    this.themeManagerService.themeSelected.subscribe((theme) => {
      this.classAttr = theme;
    });

    this.themeManagerService.selectTheme(this.themeManagerService.currentTheme);
  }

}
