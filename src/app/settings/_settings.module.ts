import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassesModule } from '../classes/_classes.module';
import { SettingsService } from '@src/_settings';

export * from './blog-page-articles';
export * from './breakpoints';
export * from './pictures-page-images';
export * from './social-platforms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ClassesModule
  ],
  providers: []
})
export class SettingsModule { }
