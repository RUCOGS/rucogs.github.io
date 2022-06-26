import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderSocialMediaButtonsComponent } from './header-social-media-buttons.component';

describe('HeaderSocialMediaButtonsComponent', () => {
  let component: HeaderSocialMediaButtonsComponent;
  let fixture: ComponentFixture<HeaderSocialMediaButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderSocialMediaButtonsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderSocialMediaButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
