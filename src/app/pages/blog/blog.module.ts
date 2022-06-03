import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogComponent } from './blog/blog.component';
import { ArticleItemComponent } from './article-item/article-item.component';

export { BlogComponent } from './blog/blog.component';
export { ArticleItemComponent } from './article-item/article-item.component';



@NgModule({
  declarations: [
    ArticleItemComponent,
    BlogComponent,
  ],
  imports: [
    CommonModule,
    // PaginatorModule,
  ]
})
export class BlogModule { }
