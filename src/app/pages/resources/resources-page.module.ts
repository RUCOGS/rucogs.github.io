import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { Route, RouterModule } from '@angular/router';
import { ResourceModule } from '@src/app/modules/resource/resource.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { ResourcesPageComponent } from './resources/resources-page.component';

const ROUTES: Route[] = [
  {
    path: '',
    component: ResourcesPageComponent,
    data: {
      titleAll: 'Resources',
    },
  },
];

@NgModule({
  declarations: [ResourcesPageComponent],
  imports: [RouterModule.forChild(ROUTES), CommonModule, CoreModule, ResourceModule, MatExpansionModule],
})
export class ResourcesPageModule {}
