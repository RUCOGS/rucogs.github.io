import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FilterHeaderComponent } from '@app/components/filter-header/filter-header.component';
import { PaginatorComponent } from '@app/components/paginator/paginator.component';
import { ArticleInfo } from '@app/utils/article-info';
import { BlogPageArticles } from '@app/utils/blog-page-articles';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements AfterViewInit {

  @ViewChild(FilterHeaderComponent) filterHeader: FilterHeaderComponent | undefined;
  @ViewChild("paginatorTop") paginatorTop: PaginatorComponent | undefined;
  @ViewChild("paginatorBottom") paginatorBottom: PaginatorComponent | undefined;

  currentPage: number = 1;
  articles: ArticleInfo[] = BlogPageArticles;
  filteredArticles: ArticleInfo[] = [];
  activeArticles: ArticleInfo[] = [];
  lastPage: number = 10;
  articlesPerPage: number = 5;

  constructor(private changeDetector: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    if (!this.filterHeader || !this.paginatorBottom || !this.paginatorTop)
      return;
    
    // NOTE: This is really inefficient because we are regenerating the entire sortedSections array
    //       whenever the user changes a filter option. We should consider only modifying parts of
    //       of the sorted array that are needed (ie. only reversing the sortedSections if sortAscending 
    //       changes).
    this.filterHeader.newSearchRequest.subscribe(this.onNewSearchRequest.bind(this));
    this.paginatorTop.currentPageChange.subscribe(this.onCurrentPageChange.bind(this));
    this.paginatorBottom.currentPageChange.subscribe(this.onCurrentPageChange.bind(this));

    this.lastPage = Math.ceil(this.articles.length / this.articlesPerPage);

    console.log("length " + this.articles.length + " articlesPerPage" + this.articlesPerPage + " last page: " + this.lastPage)
    this.filteredArticles = this.articles;
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

    // Manually invoke to update the page
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
      const pageIndex = this.currentPage - 1 + i;
      if (pageIndex >= this.filteredArticles.length)
        break;
      this.activeArticles.push(this.filteredArticles[pageIndex]);
    }
  }

  onNewSearchRequest() {
    
  }
}
