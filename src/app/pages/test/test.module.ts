import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TestPageComponent } from './test-page/test-page.component';
import { ServicesModule } from '@src/app/services/_services.module';
import { Route, RouterModule } from '@angular/router';

const ROUTES: Route[] = [
 { path: '', component: TestPageComponent }
];

@NgModule({
  declarations: [
    TestPageComponent
  ],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    ServicesModule
  ],
})
export class TestPageModule { }
