import { AfterViewInit, Component, ContentChildren, ElementRef, HostBinding, Input, OnDestroy, OnInit, QueryList } from '@angular/core';
import { CssLengthService } from '@src/app/services/css-length.service';

@Component({
  selector: 'app-card-grid',
  templateUrl: './card-grid.component.html',
  styleUrls: ['./card-grid.component.css']
})
export class CardGridComponent implements OnInit, AfterViewInit, OnDestroy {
  
  @Input('column-width') columnWidth: string = "250px";
  @Input() columns: string = "auto-fit";
  @Input('auto-fit-columns') autofitColumns: boolean = true

  @HostBinding('style.grid-template-columns')
  gridTemplateColumns: string = '';
  observer: MutationObserver;

  constructor(
    private elementRef: ElementRef,
    private cssLength: CssLengthService,
  ) { 
    this.observer = new MutationObserver(mutations => {    
      const element = this.elementRef.nativeElement as HTMLElement;
      const pixelColumnWidth = this.cssLength.convertToNumber(this.columnWidth, 'px');
      const possibleColumnCount = Math.floor(element.offsetWidth / pixelColumnWidth);
      if (element.children.length < possibleColumnCount) {
        // Override autofitting
        this.updateGridTemplateColumns(false);
      } else {
        // Use autofitting
        this.updateGridTemplateColumns();
      }
    });
  }

  ngOnDestroy(): void {
    this.observer.disconnect();
  }
  
  ngOnInit(): void {
    this.updateGridTemplateColumns();
  }

  updateGridTemplateColumns(autofit: boolean = this.autofitColumns) {
    this.gridTemplateColumns = `repeat( ${this.columns}, ` + (autofit ? `minmax(${this.columnWidth}, 1fr)` : this.columnWidth) + ` )`;
  }

  ngAfterViewInit(): void {
    this.observer.observe(this.elementRef.nativeElement, {
      childList: true
    });
  }
}
