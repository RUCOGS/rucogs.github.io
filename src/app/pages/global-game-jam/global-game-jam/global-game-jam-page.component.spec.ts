import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalGameJamPageComponent } from './global-game-jam-page.component';

describe('GlobalGameJamComponent', () => {
  let component: GlobalGameJamPageComponent;
  let fixture: ComponentFixture<GlobalGameJamPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GlobalGameJamPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalGameJamPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
