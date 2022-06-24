import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';

const ROUTES: Route[] = [
  { path: '', loadChildren: () => import('./blog-page/blog-page.module').then(m => m.BlogPageModule) },
  { path: '**', loadChildren: () => import('./article-page/article-page.module').then(m => m.ArticlePageModule) },
];

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES),
    CommonModule,
  ],
})
export class BlogDirModule { }
