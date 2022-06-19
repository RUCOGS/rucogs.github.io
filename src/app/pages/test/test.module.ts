import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page/test-page.component';
import { ServicesModule } from '@src/app/services/_services.module';

export { TestPageComponent };


@NgModule({
  declarations: [
    TestPageComponent
  ],
  imports: [
    CommonModule,
    ServicesModule
  ],
  exports: [
    TestPageComponent
  ]
})
export class TestPageModule { }
