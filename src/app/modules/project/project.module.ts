import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectsDisplayComponent } from './projects-display/projects-display.component';
import { FilteringModule } from '../filtering/filtering.module';
import { CardsModule } from '../cards/cards.module';
import { AvatarModule } from '../avatar/avatar.module';
import { TagsModule } from '../tags/tags.module';
import { RouterModule } from '@angular/router';
import { SettingsModule } from '@src/app/settings/_settings.module';
import { InlineProjectItemComponent } from './inline-project-item/inline-project-item.component';

export { ProjectsDisplayComponent };
export { ProjectItemComponent };
export { InlineProjectItemComponent };
export * from './_classes/access-options';


@NgModule({
  declarations: [
    ProjectItemComponent,
    ProjectsDisplayComponent,
    InlineProjectItemComponent,
  ],
  imports: [
    CommonModule,
    FilteringModule,
    CardsModule,
    AvatarModule,
    TagsModule,
    RouterModule,
    SettingsModule,
  ],
  exports: [
    InlineProjectItemComponent,
    ProjectItemComponent,
    ProjectsDisplayComponent
  ]
})
export class ProjectModule { }
