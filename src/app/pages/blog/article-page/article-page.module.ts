import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule, UrlSegment } from '@angular/router';
import { MarkdownNavModule } from '@src/app/modules/markdown-nav/markdown-nav.module';
import { TagsModule } from '@src/app/modules/tags/tags.module';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { SettingsModule } from '@src/app/settings/_settings.module';
import { MarkdownModule } from 'ngx-markdown';
import { ArticlePageComponent } from './article/article-page.component';

export { ArticlePageComponent };

const ROUTES: Route[] = [{ path: '', component: ArticlePageComponent }];

@NgModule({
  declarations: [ArticlePageComponent],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    TagsModule,
    MarkdownModule,
    MarkdownNavModule,
    CoreModule,
    SettingsModule,
  ],
})
export class ArticlePageModule {}
