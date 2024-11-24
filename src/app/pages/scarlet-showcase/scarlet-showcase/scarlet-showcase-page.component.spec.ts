import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScarletShowcasePageComponent } from './scarlet-showcase-page.component';

describe('ScarletShowcaseComponent', () => {
  let component: ScarletShowcasePageComponent;
  let fixture: ComponentFixture<ScarletShowcasePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScarletShowcasePageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScarletShowcasePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
