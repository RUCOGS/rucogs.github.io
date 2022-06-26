import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BreakpointManagerService } from '@app/services/breakpoint-manager.service';
import { ArticleInfo } from '@app/classes/_classes.module';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css'],
})
export class ArticleItemComponent implements OnInit {
  @Input() article: ArticleInfo = new ArticleInfo('N/A', 'N/A', 'N/A', 'N/A', 'N/A', [], []);

  constructor(private router: Router, public breakpointManager: BreakpointManagerService) {}

  ngOnInit(): void {}

  onClick() {
    this.router.navigateByUrl('blog/' + this.article.filePath.split('.')[0]);
  }
}
