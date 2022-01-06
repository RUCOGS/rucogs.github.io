import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterHeaderComponent } from './filter-header.component';

describe('FilterHeaderComponent', () => {
  let component: FilterHeaderComponent;
  let fixture: ComponentFixture<FilterHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
