import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScarletGameJamComponent } from './scarlet-game-jam.component';

describe('ScarletGameJamComponent', () => {
  let component: ScarletGameJamComponent;
  let fixture: ComponentFixture<ScarletGameJamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScarletGameJamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScarletGameJamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
