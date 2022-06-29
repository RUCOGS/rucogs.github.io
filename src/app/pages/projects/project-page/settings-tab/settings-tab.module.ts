import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { SettingsTabComponent } from './settings-tab/settings-tab.component';

@NgModule({
  declarations: [SettingsTabComponent],
  imports: [CommonModule, MatIconModule, MatButtonModule, MatTooltipModule, CoreModule],
  exports: [SettingsTabComponent],
})
export class SettingsTabModule {}
