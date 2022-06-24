import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlePageComponent } from './article/article-page.component';
import { TagsModule } from '@src/app/modules/tags/tags.module';
import { MarkdownNavModule } from '@src/app/modules/markdown-nav/markdown-nav.module';
import { MarkdownModule } from 'ngx-markdown';
import { CoreModule } from '@src/app/modules/_core/core.module';

export { ArticlePageComponent };


@NgModule({
  declarations: [
    ArticlePageComponent
  ],
  imports: [
    CommonModule,
    TagsModule,
    MarkdownModule,
    MarkdownNavModule,
    CoreModule
  ],
  exports: [
    ArticlePageComponent
  ]
})
export class ArticlePageModule { }
