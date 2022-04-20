import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleInfo } from '@app/utils/article-info';
import { BlogPageArticles, BlogPageArticlesDir } from '@app/utils/blog-page-articles';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  @Input() article: ArticleInfo | undefined;
  articles: ArticleInfo[] = BlogPageArticles;
  headings: Element[] | undefined;
  articlesDir: string = BlogPageArticlesDir;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private markdownService: MarkdownService, 
    private elementRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit(): void {
    var articleParam = this.activatedRoute.snapshot.paramMap.get('article');
    if (articleParam) {
      // TODO: Change in future to not store .md in url in the first place
      const articleFilePath = decodeURIComponent(articleParam);
      this.article = this.articles.find(x => x.filePath == articleFilePath);
    }
  }

  onLoad(): void {
    this.stripContent();
    this.setHeadings();
  }

  private setHeadings(): void {
    const headings: Element[] = [];
    this.elementRef.nativeElement
      .querySelectorAll('h2')
      .forEach(x => headings.push(x));
    this.headings = headings;
  }

  private stripContent(): void {
    this.elementRef.nativeElement
      .querySelector('markdown')!
      .querySelectorAll('markdown > p:nth-child(-n + 2), #ngx-markdown, #table-of-contents + ul, #table-of-contents')
      .forEach(x => x.remove());
  }

  getBgStyle(): Object {
    return { 
      'background-image': 'linear-gradient(to bottom, var(--background-color), #00000000), url(' + this.article?.imagePath + ')'
    }
  }
}
