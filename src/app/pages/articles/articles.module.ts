import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlesComponent } from './articles/articles.component';
import { TagsModule } from '@src/app/modules/tags/tags.module';
import { MarkdownNavModule } from '@src/app/modules/markdown-nav/markdown-nav.module';
import { MarkdownModule } from 'ngx-markdown';

export { ArticlesComponent } from './articles/articles.component';


@NgModule({
  declarations: [
    ArticlesComponent
  ],
  imports: [
    CommonModule,
    TagsModule,
    MarkdownModule,
    MarkdownNavModule
  ],
  exports: [
    ArticlesComponent
  ]
})
export class ArticlesModule { }
