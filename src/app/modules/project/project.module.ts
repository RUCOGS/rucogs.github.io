import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatOptionModule } from '@angular/material/core';
import { RouterModule } from '@angular/router';
import { SettingsModule } from '@src/app/settings/_settings.module';
import { AvatarModule } from '../avatar/avatar.module';
import { CardsModule } from '../cards/cards.module';
import { FilteringModule } from '../filtering/filtering.module';
import { TagsModule } from '../tags/tags.module';
import { InlineProjectItemComponent } from './inline-project-item/inline-project-item.component';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectsDisplayComponent } from './projects-display/projects-display.component';

export * from './_classes/access-options';
export { ProjectsDisplayComponent };
export { ProjectItemComponent };
export { InlineProjectItemComponent };

@NgModule({
  declarations: [ProjectItemComponent, ProjectsDisplayComponent, InlineProjectItemComponent],
  imports: [
    CommonModule,
    FilteringModule,
    CardsModule,
    AvatarModule,
    TagsModule,
    RouterModule,
    SettingsModule,
    MatOptionModule,
  ],
  exports: [InlineProjectItemComponent, ProjectItemComponent, ProjectsDisplayComponent],
})
export class ProjectModule {}
