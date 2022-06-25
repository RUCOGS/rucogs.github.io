import { Directive, Input } from "@angular/core";
import { BaseScrollPaginationComponent } from "./base-scroll-pagination-component";

@Directive()
export abstract class BaseFilteredScrollPaginationComponent<TValue, TFilter> extends BaseScrollPaginationComponent<TValue> {
  abstract getFilter(): TFilter;
  
  get valuesQuery() {
    return async (skip: number, limit: number) => {
      return await this.filteredValuesQuery(this.getFilter(), skip, limit);
    }
  }

  get filteredValuesQuery() { return this._filteredValuesQuery; }
  set filteredValuesQuery(value) { this._filteredValuesQuery = value; }
  protected _filteredValuesQuery: (filter: TFilter, skip: number, limit: number) => Promise<TValue[]> = async (filter, skip, limit) => {
    return [];
  };
}