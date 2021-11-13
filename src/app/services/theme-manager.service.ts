/**
 * Copied from https://github.com/angular/material.angular.io/blob/master/src/app/shared/style-manager/style-manager.ts
 */

import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  // declares that this service should be created
  // by the root application injector.
  providedIn: 'root',
})
export class ThemeManagerService {
  
  constructor(private cookieSerivce: CookieService) {
    if (cookieSerivce.check('theme'))
      this.currentTheme = cookieSerivce.get('theme');
    else
      this.selectTheme('default-theme');
  }

  currentTheme: string = "default-theme";
  themeSelected: BehaviorSubject<string> = new BehaviorSubject("");

  selectTheme(theme: string) {
    this.themeSelected.next(theme);
    this.currentTheme = theme;
    this.cookieSerivce.set('theme', this.currentTheme);
  }
}
