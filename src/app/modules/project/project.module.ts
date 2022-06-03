import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectItemComponent } from './project-item/project-item.component';
import { ProjectsDisplayComponent } from './projects-display/projects-display.component';
import { FilteringModule } from '../filtering/filtering.module';
import { CardsModule } from '../cards/cards.module';
import { AvatarModule } from '../avatar/avatar.module';
import { TagsModule } from '../tags/tags.module';



@NgModule({
  declarations: [
    ProjectItemComponent,
    ProjectsDisplayComponent,
  ],
  imports: [
    CommonModule,
    FilteringModule,
    CardsModule,
    AvatarModule,
    TagsModule
  ],
  exports: [
    ProjectItemComponent,
    ProjectsDisplayComponent
  ]
})
export class ProjectModule { }
