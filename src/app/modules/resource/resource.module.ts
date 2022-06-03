import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourceItemComponent } from './resource-item/resource-item.component';
import { ResourcePanelComponent } from './resource-panel/resource-panel.component';
import { IconModule } from '@visurel/iconify-angular';
import { MatExpansionModule } from '@angular/material/expansion';



@NgModule({
  declarations: [
    ResourceItemComponent,
    ResourcePanelComponent,
  ],
  imports: [
    CommonModule,
    IconModule,
    MatExpansionModule
  ],
  exports: [
    ResourceItemComponent,
    ResourcePanelComponent,
  ]
})
export class ResourceModule { }
