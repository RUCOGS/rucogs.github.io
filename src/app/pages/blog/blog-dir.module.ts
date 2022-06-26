import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule, UrlSegment } from '@angular/router';

const ROUTES: Route[] = [
  { path: '', loadChildren: () => import('./blog-page/blog-page.module').then((m) => m.BlogPageModule) },
  {
    matcher: (url: UrlSegment[]) => {
      if (url.length > 1) {
        return {
          consumed: url,
          posParams: {
            article: new UrlSegment(url.join('/'), {}),
          },
        };
      }
      return null;
    },
    loadChildren: () => import('./article-page/article-page.module').then((m) => m.ArticlePageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES), CommonModule],
})
export class BlogDirModule {}
