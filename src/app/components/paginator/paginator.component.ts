import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.css']
})
export class PaginatorComponent implements OnInit {

  private _currentPage: number = 1;
  private _ngInitialized: boolean = false;

  @Input() set currentPage(value: number) {
    this._currentPage = value;
    if (this._ngInitialized)
      this.updatePagesAheadBehind();
  }
  
  get currentPage() {
    return this._currentPage;
  }

  @Input() lastPage: number = 1;

  pagesAhead: number[] = [];
  pagesBehind: number[] = [];

  toggleGroupValue: string = "";

  constructor() { }

  ngOnInit(): void {
    this._ngInitialized = true;
    this.updatePagesAheadBehind();
  }

  updatePagesAheadBehind() {
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

    this.pagesBehind.reverse();
  }

  onToggleGroupValueChanged(value: string) {
    if (value == "first") {
      this.currentPage = 1;
    } else if (value == "last") {
      this.currentPage = this.lastPage;
    } else if (value == "previous") {
      this.currentPage--;
    } else if (value == "next") {
      this.currentPage++;
    } else {
      this.currentPage = +value;
    }
    console.log("next " + this.currentPage);

    this.toggleGroupValue = "currentPage";
  }
}
