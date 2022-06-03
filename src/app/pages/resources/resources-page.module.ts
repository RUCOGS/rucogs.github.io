import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesPageComponent } from './resources/resources-page.component';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { ResourceModule } from '@src/app/modules/resource/resource.module';
import { MatExpansionModule } from '@angular/material/expansion';

export { ResourcesPageComponent };


@NgModule({
  declarations: [
    ResourcesPageComponent
  ],
  imports: [
    CommonModule,
    CoreModule,
    ResourceModule,
    MatExpansionModule
  ],
  exports: [
    ResourcesPageComponent
  ]
})
export class ResourcesPageModule { }
