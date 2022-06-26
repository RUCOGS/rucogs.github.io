import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InlineOptionsProfileComponent } from './inline-options-profile.component';

describe('InlineOptionsProfileComponent', () => {
  let component: InlineOptionsProfileComponent;
  let fixture: ComponentFixture<InlineOptionsProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InlineOptionsProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InlineOptionsProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
