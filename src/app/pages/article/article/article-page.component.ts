import { Component, ElementRef, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArticleInfo } from '@app/classes/_classes.module';
import { BlogPageArticles, BlogPageArticlesDir } from '@app/settings/_settings.module';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.css']
})
export class ArticlePageComponent implements OnInit {

  @Input() article: ArticleInfo | undefined;
  articles: ArticleInfo[] = BlogPageArticles;
  headings: Element[] | undefined;
  articlesDir: string = BlogPageArticlesDir;

  constructor(
    private activatedRoute: ActivatedRoute, 
    private markdownService: MarkdownService, 
    private elementRef: ElementRef<HTMLElement>
  ) { 
    this.markdownService.renderer.link = (href: string, title: string, text: string) => {
      return `<a href='${href}'` + (title ? `title='${title}'` : '') + `target='_blank'>${text}</a>`
    }
  }

  ngOnInit(): void {
    var articleParam = this.activatedRoute.snapshot.paramMap.get('article');
    if (articleParam) {
      // TODO: Change in future to not store .md in url in the first place
      const articleFilePath = decodeURIComponent(articleParam);
      this.article = this.articles.find(x => x.filePath == articleFilePath);
    }
    console.log(`${this.articlesDir}${this.article?.filePath}.md`);
  }

  onLoad(): void {
    this.setHeadings();
  }

  private setHeadings(): void {
    const headings: Element[] = [];
    this.elementRef.nativeElement
      .querySelectorAll('h2')
      .forEach(x => headings.push(x));
    this.headings = headings;
  }

  getBgStyle(): Object {
    return { 
      'background-image': 'linear-gradient(to bottom, var(--background-color), #00000000), url(' + this.article?.imagePath + ')'
    }
  }
}
