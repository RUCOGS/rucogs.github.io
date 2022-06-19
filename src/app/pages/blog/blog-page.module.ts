import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogPageComponent } from './blog/blog-page.component';
import { ArticleItemComponent } from './article-item/article-item.component';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { PaginatorModule } from '@src/app/modules/paginator/paginator.module';
import { FilteringModule } from '@src/app/modules/filtering/filtering.module';
import { TagsModule } from '@src/app/modules/tags/tags.module';

export { BlogPageComponent };



@NgModule({
  declarations: [
    ArticleItemComponent,
    BlogPageComponent,
  ],
  imports: [
    CommonModule,
    CoreModule,
    PaginatorModule,
    FilteringModule,
    TagsModule
  ],
  exports: [
    BlogPageComponent
  ]
})
export class BlogPageModule { }
