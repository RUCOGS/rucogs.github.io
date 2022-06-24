import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesPageComponent } from './resources/resources-page.component';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { ResourceModule } from '@src/app/modules/resource/resource.module';
import { MatExpansionModule } from '@angular/material/expansion';
import { Route, RouterModule } from '@angular/router';

const ROUTES: Route[] = [
  { path: '', component: ResourcesPageComponent }
];

@NgModule({
  declarations: [
    ResourcesPageComponent
  ],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    CoreModule,
    ResourceModule,
    MatExpansionModule
  ]
})
export class ResourcesPageModule { }
