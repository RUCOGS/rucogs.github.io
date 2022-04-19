import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FilterHeaderComponent } from '@app/components/filter-header/filter-header.component';
import { PaginatorComponent } from '@app/components/paginator/paginator.component';
import { Article } from '@app/utils/article';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements AfterViewInit {

  @ViewChild(FilterHeaderComponent) filterHeader: FilterHeaderComponent | undefined;
  @ViewChild("paginatorTop") paginatorTop: PaginatorComponent | undefined;
  @ViewChild("paginatorBottom") paginatorBottom: PaginatorComponent | undefined;

  articles: Article[] = [];
  lastPage: number = 10;

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
  }

  onCurrentPageChange(value: number) {
    if (!this.paginatorBottom || !this.paginatorTop)
      return;
    
    if (this.paginatorTop.currentPage != value)
      this.paginatorTop.setCurrentPageEventless(value);
    if (this.paginatorBottom.currentPage != value)
      this.paginatorBottom.setCurrentPageEventless(value);
  }

  onNewSearchRequest() {
    
  }
}
