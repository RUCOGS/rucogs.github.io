import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteLeftSideBarComponent } from './site-left-side-bar.component';

describe('SiteLeftSideBarComponent', () => {
  let component: SiteLeftSideBarComponent;
  let fixture: ComponentFixture<SiteLeftSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteLeftSideBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteLeftSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
