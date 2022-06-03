import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesComponent } from './resources/resources.component';

export { ResourcesComponent } from './resources/resources.component';


@NgModule({
  declarations: [
    ResourcesComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResourcesComponent
  ]
})
export class ResourcesModule { }
