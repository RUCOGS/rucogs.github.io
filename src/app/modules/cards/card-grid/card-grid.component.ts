import { AfterViewInit, Component, ElementRef, HostBinding, Input, OnDestroy, OnInit } from '@angular/core';
import { CssLengthService } from '@src/app/services/css-length.service';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.css'],
})
export class CardGridComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input('column-width') columnWidth: string = '20em';
  @Input() columns: string = 'auto-fit';
  @Input('auto-fit-columns') autofitColumns: boolean = true;

  @HostBinding('style.grid-template-columns')
  gridTemplateColumns: string = '';
  observer: MutationObserver;

  constructor(private elementRef: ElementRef, private cssLength: CssLengthService) {
    this.observer = new MutationObserver((mutations) => {
      this.updateGridTemplateColumns();
    });
  }

  ngOnInit(): void {
    this.updateGridTemplateColumns(true);
  }

  ngAfterViewInit(): void {
    this.observer.observe(this.elementRef.nativeElement, {
      childList: true,
    });
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }

  updateGridTemplateColumns(ignoreMinSizeCheck: boolean = false) {
    let autofit = this.autofitColumns;
    let smallFit = false;
    if (!ignoreMinSizeCheck) {
      const element = this.elementRef.nativeElement as HTMLElement;
      const pixelColumnWidth = this.cssLength.convertToNumber(this.columnWidth, 'px');
      const possibleColumnCount = Math.floor(element.offsetWidth / pixelColumnWidth);

      autofit = element.children.length < possibleColumnCount ? false : this.autofitColumns;
      smallFit = element.offsetWidth <= pixelColumnWidth;
    }

    if (smallFit) this.gridTemplateColumns = `repeat( ${this.columns} )`;
    else
      this.gridTemplateColumns =
        `repeat( ${this.columns}, ` + (autofit ? `minmax(${this.columnWidth}, 1fr)` : this.columnWidth) + ` )`;
  }
}
