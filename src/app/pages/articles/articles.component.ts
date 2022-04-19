import { Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MarkdownService } from 'ngx-markdown';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  article: string = "";
  headings: Element[] | undefined;

  bgImage: string = "assets/images/wide-club-interlaced.png";
  color: string = "primary";
  bgRepeatMode: string = "";
  bgPosition: string = "";

  constructor(
    private activatedRoute: ActivatedRoute, 
    private markdownService: MarkdownService, 
    private elementRef: ElementRef<HTMLElement>
  ) { }

  ngOnInit(): void {
    var articleParam = this.activatedRoute.snapshot.paramMap.get('article');
    if (articleParam) {
      this.article = articleParam;
    }
  }

  onLoad(): void {
    this.stripContent();
    this.setHeadings();
  }

  private setHeadings(): void {
    const headings: Element[] = [];
    this.elementRef.nativeElement
      .querySelectorAll('h1')
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
      'background-image': 'linear-gradient(to bottom, var(--background-color), #00000000), url(' + this.bgImage + ')',
      ...(this.bgRepeatMode !== "" && {'background-repeat': this.bgRepeatMode, 'background-size': 'auto' }),
      ...(this.bgPosition !== "" && {'background-position': this.bgPosition})
    }
  }
}
