import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSocialMediaButtonsComponent } from './footer-social-media-buttons.component';

describe('FooterSocialMediaButtonsComponent', () => {
  let component: FooterSocialMediaButtonsComponent;
  let fixture: ComponentFixture<FooterSocialMediaButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FooterSocialMediaButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FooterSocialMediaButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
