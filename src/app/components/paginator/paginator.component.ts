import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, Output, ViewChild, EventEmitter } from '@angular/core';
import { MatButtonToggle } from '@angular/material/button-toggle';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements AfterViewInit {

  private _currentPage: number = 1;

  @Output() currentPageChange = new EventEmitter<number>();

  @ViewChild('currentPageToggle') currentPageToggle : MatButtonToggle | undefined;

  @Input() set currentPage(value: number) {
    this._currentPage = value;
    if (this._currentPage > this.lastPage)
      this._currentPage = this.lastPage;
    this.updatePagesAheadBehind();
    this.currentPageChange.emit(this.currentPage);
  }

  setCurrentPageEventless(value: number) {
    this._currentPage = value;
    this.updatePagesAheadBehind();
  }
  
  get currentPage() {
    return this._currentPage;
  }

  @Input() lastPage: number = 1;

  pagesAhead: number[] = [];
  pagesBehind: number[] = [];

  toggleGroupValue: string = "";

  constructor(private changeDetector: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.updatePagesAheadBehind();
    this.currentPageChange.emit(this.currentPage);
  }

  updatePagesAheadBehind() {
    if (!this.currentPageToggle)
      return;

    const PAGE_WINDOW_RADIUS = 2;

    this.pagesAhead = [];
    this.pagesBehind = [];
    for (let i = 1; i <= PAGE_WINDOW_RADIUS; i++) {
      if (this.currentPage + i <= this.lastPage) {
        this.pagesAhead.push(this.currentPage + i);
      }
      if (this.currentPage - i >= 1) {
        this.pagesBehind.push(this.currentPage - i);
      }
    }

    if (this.pagesBehind.length < PAGE_WINDOW_RADIUS) {
      // Try adding to pagesAhead.
      let leftoverPages = PAGE_WINDOW_RADIUS - this.pagesBehind.length;
      while (leftoverPages > 0 && this.pagesAhead[this.pagesAhead.length - 1] < this.lastPage) { 
        this.pagesAhead.push(this.pagesAhead[this.pagesAhead.length - 1] + 1);
        leftoverPages--;
      }
    } else if (this.pagesAhead.length < PAGE_WINDOW_RADIUS) {
      // Try adding to pagesBehind.
      let leftoverPages = PAGE_WINDOW_RADIUS - this.pagesAhead.length;
      while (leftoverPages > 0 && this.pagesBehind[this.pagesBehind.length - 1] > 1) { 
        this.pagesBehind.push(this.pagesBehind[this.pagesBehind.length - 1] - 1);
        leftoverPages--;
      }
    }

    this.currentPageToggle.checked = true;
    this.pagesBehind.reverse();

    this.changeDetector.detectChanges();
  }

  onClick(value: string | number) {
    if (value == "first") {
      this.currentPage = 1;
    } else if (value == "last") {
      this.currentPage = this.lastPage;
    } else if (value == "previous" && this.currentPage > 1) {
      this.currentPage--;
    } else if (value == "next" && this.currentPage < this.lastPage) {
      this.currentPage++;
    } else if (typeof value == 'number'){
      this.currentPage = value;
    }

    this.updatePagesAheadBehind();
  }
}
