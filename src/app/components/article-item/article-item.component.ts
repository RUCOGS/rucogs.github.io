import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleInfo } from '@app/utils/article-info';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {

  @Input() article: ArticleInfo = new ArticleInfo("N/A", "N/A", "N/A", "N/A", "N/A", [], []);

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  getAuthorsString(): string {
    return "By: " + this.article.authors.join(", ");
  }

  onClick() {
    this.router.navigate(["blog/" + this.article.filePath.split('.')[0]]);
  }
}
