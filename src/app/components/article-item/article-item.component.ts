import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ArticleInfo } from '@app/utils/article-info';
import { Breakpoints } from '@app/utils/breakpoints';

@Component({
  selector: 'app-article-item',
  templateUrl: './article-item.component.html',
  styleUrls: ['./article-item.component.css']
})
export class ArticleItemComponent implements OnInit {

  @Input() article: ArticleInfo = new ArticleInfo("N/A", "N/A", "N/A", "N/A", "N/A", [], []);
  currentBreakpoint: string;

  constructor(private router: Router, private breakpointObserver: BreakpointObserver) { 
    if (this.breakpointObserver.isMatched(Breakpoints.Mobile))
      this.currentBreakpoint = "mobile";
    this.currentBreakpoint = "desktop";
    
    this.breakpointObserver.observe(Breakpoints.Desktop).subscribe((state: BreakpointState) => {
      if (state.matches)
        this.currentBreakpoint = "desktop";
      else
        this.currentBreakpoint = "mobile";
    });
  }

  ngOnInit(): void {
  }

  onClick() {
    this.router.navigate(["blog/" + this.article.filePath.split('.')[0]]);
  }
}
