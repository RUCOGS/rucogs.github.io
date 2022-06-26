import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScarletGameJamPageComponent } from './scarlet-game-jam-page.component';

describe('ScarletGameJamComponent', () => {
  let component: ScarletGameJamPageComponent;
  let fixture: ComponentFixture<ScarletGameJamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScarletGameJamPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScarletGameJamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
