import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticlePageComponent } from './article/article-page.component';
import { TagsModule } from '@src/app/modules/tags/tags.module';
import { MarkdownNavModule } from '@src/app/modules/markdown-nav/markdown-nav.module';
import { MarkdownModule } from 'ngx-markdown';
import { CoreModule } from '@src/app/modules/_core/core.module';
import { SettingsModule } from '@src/app/settings/_settings.module';
import { Route, RouterModule, UrlSegment } from '@angular/router';

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
