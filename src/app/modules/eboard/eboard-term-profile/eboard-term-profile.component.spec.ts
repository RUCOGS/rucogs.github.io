import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EBoardTermProfileComponent } from './eboard-term-profile.component';

describe('EBoardTermProfileComponent', () => {
  let component: EBoardTermProfileComponent;
  let fixture: ComponentFixture<EBoardTermProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EBoardTermProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EBoardTermProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
