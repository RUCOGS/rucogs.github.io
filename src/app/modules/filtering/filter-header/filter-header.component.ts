import {
  AfterViewInit,
  Attribute,
  Component,
  ContentChildren,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  QueryList,
} from '@angular/core';
import { MatOption } from '@angular/material/core';

export interface FilterChange {
  searchText: string;
  sortingMode: string;
  sortAscending: boolean;
}

@Component({
  selector: 'app-filter-header',
  templateUrl: './filter-header.component.html',
  styleUrls: ['./filter-header.component.css'],
})
export class FilterHeaderComponent implements OnInit, AfterViewInit {
  @Output() newSearchRequest = new EventEmitter<string>();
  @Output() sortingModeChange = new EventEmitter<string>();
  @Output() sortAscendingChange = new EventEmitter<boolean>();

  @Output() filterChange = new EventEmitter<FilterChange>();

  @ContentChildren(MatOption) queryOptions: QueryList<MatOption> = new QueryList();

  @Input() sortingMode: string = '';
  @Input() searchText: string = '';
  @Input() sortAscending: boolean = true;

  searchBar: boolean = false;
  filterOptions: boolean = false;
  ascendingToggle: boolean = false;

  sortingModes: SortingMode[] = [];
  afterViewInitialized: boolean = false;

  constructor(
    @Optional() @Attribute('searchBar') searchBar: any,
    @Optional() @Attribute('filterOptions') filterOptions: any,
    @Optional() @Attribute('ascendingToggle') ascendingToggle: any,
  ) {
    this.searchBar = searchBar != undefined;
    this.filterOptions = filterOptions != undefined;
    this.ascendingToggle = ascendingToggle != undefined;

    const onFilterChange = () => {
      this.filterChange.next({
        searchText: this.searchText,
        sortAscending: this.sortAscending,
        sortingMode: this.sortingMode,
      });
    };

    this.newSearchRequest.subscribe(onFilterChange);
    this.sortingModeChange.subscribe(onFilterChange);
    this.sortAscendingChange.subscribe(onFilterChange);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.sortingModes = this.queryOptions.map((x) => {
      return new SortingMode(x.value, x.viewValue);
    });
    setTimeout(() => {
      this.afterViewInitialized = true;
    });
  }

  emitNewSearchRequest(value: string) {
    this.newSearchRequest.emit(value);
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
