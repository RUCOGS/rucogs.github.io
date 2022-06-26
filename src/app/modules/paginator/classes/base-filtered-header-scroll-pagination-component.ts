import { AfterViewInit, Directive, Input, ViewChild } from '@angular/core';
import { FilterHeaderComponent } from '@app/modules/filtering/filtering.module';
import { takeUntil } from 'rxjs';
import { BaseFilteredScrollPaginationComponent } from './base-filtered-scroll-pagination-component';

@Directive()
export abstract class BaseFilteredHeaderScrollPaginationComponent<TValue, TFilter>
  extends BaseFilteredScrollPaginationComponent<TValue, TFilter>
  implements AfterViewInit
{
  @ViewChild(FilterHeaderComponent) filterHeader: FilterHeaderComponent | undefined;

  ngAfterViewInit(): void {
    if (!this.filterHeader) return;

    this.filterHeader.newSearchRequest$.pipe(takeUntil(this.onDestroy$)).subscribe(this.onNewSearchRequest.bind(this));
  }

  async onNewSearchRequest(searchText: string) {
    if (this.filterHeader === undefined) return;

    searchText = searchText.toLowerCase();

    this.resetPages();
    await this.queryUntilFillPage();
  }
}
