import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CogsLogoTextButtonComponent } from './cogs-logo-text-button.component';

describe('CogsLogoTextButtonComponent', () => {
  let component: CogsLogoTextButtonComponent;
  let fixture: ComponentFixture<CogsLogoTextButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CogsLogoTextButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CogsLogoTextButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
