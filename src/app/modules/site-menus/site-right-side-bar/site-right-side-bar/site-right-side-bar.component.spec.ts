import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteRightSideBarComponent } from './site-right-side-bar.component';

describe('SiteRightSideBarComponent', () => {
  let component: SiteRightSideBarComponent;
  let fixture: ComponentFixture<SiteRightSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SiteRightSideBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteRightSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
