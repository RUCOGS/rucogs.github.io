import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { FilteringModule } from '@src/app/modules/filtering/filtering.module';
import { PaginatorModule } from '@src/app/modules/paginator/paginator.module';
import { TagsModule } from '@src/app/modules/tags/tags.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { ArticleItemComponent } from './article-item/article-item.component';
import { BlogPageComponent } from './blog/blog-page.component';

const ROUTES: Route[] = [
  { path: '', component: BlogPageComponent },
];

@NgModule({
  declarations: [
    ArticleItemComponent,
    BlogPageComponent,
  ],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    CoreModule,
    PaginatorModule,
    FilteringModule,
    TagsModule
  ]
})
export class BlogPageModule { }
