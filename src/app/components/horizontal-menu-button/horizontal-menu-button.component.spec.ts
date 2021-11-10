import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalMenuButtonComponent } from './horizontal-menu-button.component';

describe('HorizontalMenuButtonComponent', () => {
  let component: HorizontalMenuButtonComponent;
  let fixture: ComponentFixture<HorizontalMenuButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HorizontalMenuButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HorizontalMenuButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
