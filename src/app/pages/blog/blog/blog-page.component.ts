import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { BreakpointManagerService } from '@app/services/breakpoint-manager.service';
import { ArticleInfo } from '@app/classes/_classes.module';
import { BlogPageArticles } from '@app/settings/_settings.module';
import { FilterHeaderComponent } from '@src/app/modules/filtering/filtering.module';
import { PaginatorComponent } from '@src/app/modules/paginator/paginator.module';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.css']
})
export class BlogPageComponent implements AfterViewInit {

  @ViewChild(FilterHeaderComponent) filterHeader: FilterHeaderComponent | undefined;
  @ViewChild("paginatorTop") paginatorTop: PaginatorComponent | undefined;
  @ViewChild("paginatorBottom") paginatorBottom: PaginatorComponent | undefined;

  currentPage: number = 1;
  articles: ArticleInfo[] = BlogPageArticles;
  filteredArticles: ArticleInfo[] = [];
  activeArticles: ArticleInfo[] = [];
  lastPage: number = 10;
  articlesPerPage: number = 5;

  private onDestroy$ = new Subject<void>();

  constructor(private changeDetector: ChangeDetectorRef, public breakpointManager: BreakpointManagerService) {}

  ngAfterViewInit(): void {
    if (!this.filterHeader || !this.paginatorBottom || !this.paginatorTop)
      return;
    
    // NOTE: This is really inefficient because we are regenerating the entire sortedSections array
    //       whenever the user changes a filter option. We should consider only modifying parts of
    //       of the sorted array that are needed (ie. only reversing the sortedSections if sortAscending 
    //       changes).
    this.filterHeader.newSearchRequest$.pipe(takeUntil(this.onDestroy$)).subscribe(this.onNewSearchRequest.bind(this));
    this.paginatorTop.currentPageChange.pipe(takeUntil(this.onDestroy$)).subscribe(this.onCurrentPageChange.bind(this));
    this.paginatorBottom.currentPageChange.pipe(takeUntil(this.onDestroy$)).subscribe(this.onCurrentPageChange.bind(this));

    this.filteredArticles = [...this.articles];

    // Manually invoke to update the page
    this.updateLastPage();
    this.onNewSearchRequest("");
    this.onCurrentPageChange(1);
    this.changeDetector.detectChanges();
  }

  onCurrentPageChange(value: number) {
    if (!this.paginatorBottom || !this.paginatorTop)
      return;
    
    if (this.paginatorTop.currentPage != value)
      this.paginatorTop.setCurrentPageEventless(value);
    if (this.paginatorBottom.currentPage != value)
      this.paginatorBottom.setCurrentPageEventless(value);
    
    this.currentPage = value;
    this.updateArticleEntries();
  }

  updateArticleEntries() {
    this.activeArticles = [];
    for (let i = 0; i < this.articlesPerPage; i++) {
      // Actual pages are stored in an array,
      // which is zero indexed.
      const pageIndex = (this.currentPage - 1) * this.articlesPerPage + i;
      if (pageIndex >= this.filteredArticles.length)
        break;
      this.activeArticles.push(this.filteredArticles[pageIndex]);
    }
  }

  onNewSearchRequest(searchText: string) {
    if (this.filterHeader === undefined)
      return;

    searchText = searchText.toLowerCase();

    if (searchText === "") {
      this.filteredArticles = [...this.articles];
      this.filteredArticles.sort((a: ArticleInfo, b: ArticleInfo) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);
        if (dateA < dateB)
          return 1;
        else if (dateA > dateB)
          return -1;
        else
          return 0;
      });
    } else {
      this.filteredArticles = [];
      let articlesWithRankings: ArticleWithRanking[] = [];
      for (let article of this.articles) {
        const searchRanking = this.getArticleText(article).indexOf(searchText);
        if (searchRanking >= 0)
          articlesWithRankings.push(new ArticleWithRanking(article, searchRanking));
      }
      articlesWithRankings.sort((a: ArticleWithRanking, b: ArticleWithRanking) => {
        return b.ranking - a.ranking;
      });
      this.filteredArticles = articlesWithRankings.map(x => x.article);
    }

    this.updateLastPage();
    this.onCurrentPageChange(1);
  }

  updateLastPage() {
    this.lastPage = Math.ceil(this.filteredArticles.length / this.articlesPerPage);
  }

  // Text representation of an article
  getArticleText(article: ArticleInfo): string {
    return (article.title + " " + article.description + " " + article.date + " " + article.authors.join(" ") + " " + article.tags.join(" ")).toLowerCase();
  }

  onDesktop(): boolean {
    return this.breakpointManager.currentBreakpoint == 'desktop';
  }
}

class ArticleWithRanking {
  constructor(public article: ArticleInfo, public ranking: number) {}
}
