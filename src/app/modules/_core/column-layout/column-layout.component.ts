import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { BreakpointManagerService } from '@src/app/services/breakpoint-manager.service';

@Component({
  selector: 'app-column-layout',
  templateUrl: './column-layout.component.html',
  styleUrls: ['./column-layout.component.css'],
})
export class ColumnLayoutComponent implements OnInit {
  @Input('grid-template-columns') gridTemplateColumns: string = 'repeat(2, 1fr)';
  @HostBinding('style.grid-template-columns') currGridTemplateColumns: string = '';

  constructor(private breakpointManagerService: BreakpointManagerService) {
    breakpointManagerService.onBreakpointChanged.subscribe(() => {
      this.updateGrid();
    });
  }

  ngOnInit(): void {
    this.updateGrid();
  }

  updateGrid() {
    this.currGridTemplateColumns = this.breakpointManagerService.matchedBreakpointOrBelow('MOBILE')
      ? 'repeat(1, 1fr)'
      : this.gridTemplateColumns;
  }
}
