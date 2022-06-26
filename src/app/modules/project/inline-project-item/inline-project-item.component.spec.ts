import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineProjectItemComponent } from './inline-project-item.component';

describe('InlineProjectItemComponent', () => {
  let component: InlineProjectItemComponent;
  let fixture: ComponentFixture<InlineProjectItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InlineProjectItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineProjectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
