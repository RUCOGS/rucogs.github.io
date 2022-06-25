import { Directive, Input } from "@angular/core";
import { WithDestroy, WithInit } from "@src/app/classes/_classes.module";
import { BackendService, CdnService, ScrollService } from "@src/app/services/_services.module";
import { takeUntil } from "rxjs";
import { Mixin } from "ts-mixer";

@Directive()
export abstract class BaseScrollPaginationComponent<TValue> extends Mixin(WithDestroy, WithInit) {
  protected _values: TValue[] = [];
  get values() { return this._values; }
  set values(values) { this._values = values; }
  
  currentPage: number = 0;
  valuesPerPage: number = 5;
  fillingPage: boolean = false;
  loaded: boolean = false;
  loadedEverything: boolean = false;

  constructor(
    public cdn: CdnService,
    protected backend: BackendService,
    protected scrollService: ScrollService
  ) {
    super();
  }

  ngOnInit() {
    super.ngOnInit();
    this.scrollService.scrolledToBottom$.pipe(takeUntil(this.onDestroy$)).subscribe(this.onScrollToBottom.bind(this));
    this.queryUntilFillPage();
  }
  
  async onScrollToBottom() {
    await this.queryUntilFillPage();
  }

  resetPages() {
    this.values = [];
    this.currentPage = 0;
    this.loaded = false;
    this.loadedEverything = false;
  }

  async queryUntilFillPage() {
    if (this.fillingPage || this.loadedEverything)
      return;

    this.fillingPage = true;
    let resultsLength: number = 0;
    this.scrollService.updateScrollData();
    const ogPos = this.scrollService.position;
    do {
      resultsLength = await this.addPage();
      // While we haven't filled up the page and there are more projects,
      // then we continue querying to fill up the page
      this.scrollService.updateScrollData();
    } while (this.scrollService.maxPosition - ogPos < 300 && resultsLength > 0);
    this.fillingPage = false;
  }

  async addPage() {
    this.loaded = false;
    const result = await this.valuesQuery(this.currentPage * this.valuesPerPage, this.valuesPerPage);
    if (result.length == 0) {
      this.loaded = true;
      this.loadedEverything = true;
      return 0;
    }
    
    if (result.length < this.valuesPerPage) {
      this.loadedEverything = true;
    }
    this.values = this.values?.concat(result) ?? result;
    this.currentPage++;
    this.loaded = true;
    return result.length;
  }

  get valuesQuery() { return this._valuesQuery; }
  set valuesQuery(value) { this._valuesQuery = value; }
  protected _valuesQuery: (skip: number, limit: number) => Promise<TValue[]> = async (skip, limit) => {
    return [];
  };
}