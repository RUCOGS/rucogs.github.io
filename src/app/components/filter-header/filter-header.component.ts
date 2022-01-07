import { AfterViewInit, Component, ContentChildren, Input, OnInit, Output, QueryList, EventEmitter } from '@angular/core';
import { MatOption } from '@angular/material/core';

@Component({
  selector: 'app-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.css']
})
export class FilterHeaderComponent implements OnInit, AfterViewInit {
  
  @Output() newSearchRequest = new EventEmitter<string>();
  @Output() sortingModeChange = new EventEmitter<string>();
  @Output() sortAscendingChange = new EventEmitter<boolean>();
  @ContentChildren(MatOption) queryOptions: QueryList<MatOption> = new QueryList();

  @Input() sortingMode: string = "";
  @Input() searchText: string = "";
  @Input() sortAscending: boolean = true;
  
  sortingModes: SortingMode[] = [];
  afterViewInitialized: boolean = false;

  constructor() {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.sortingModes = this.queryOptions.map(x => {
      return new SortingMode(x.value, x.viewValue);
    });
    setTimeout(() => {
      this.afterViewInitialized = true;
    });
  }

  emitNewSearchRequest(value: string) {
    this.newSearchRequest.emit(value)
  }

  emitSortingModeChange(value: string) {
    this.sortingModeChange.emit(value);
  }

  emitSortAscendingChange(value: boolean) {
    this.sortAscendingChange.emit(value);
  }
}

class SortingMode {
  constructor(public value: string, public viewValue: string) {}
}