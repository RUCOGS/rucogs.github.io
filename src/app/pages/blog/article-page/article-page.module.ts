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

const ROUTES: Route[] = [
  { 
    matcher: (url: UrlSegment[]) => {
      if (url.length > 1 && url[0].path === "blog") {
        return {
          consumed: url,
          posParams: {
            article: new UrlSegment(url.slice(1).join("/"), {})
          }
        };
      }
      return null;
    }, 
    component: ArticlePageComponent 
  },
];

@NgModule({
  declarations: [
    ArticlePageComponent
  ],
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
    TagsModule,
    MarkdownModule,
    MarkdownNavModule,
    CoreModule,
    SettingsModule
  ]
})
export class ArticlePageModule { }
