import { AfterViewInit, Directive, ViewChild } from '@angular/core';
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

    this.filterHeader.filterChange.pipe(takeUntil(this.onDestroy$)).subscribe(this.onFilterChange.bind(this));
  }

  async onFilterChange() {
    this.resetPages();
    await this.queryUntilFillPage();
  }
}
