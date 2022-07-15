import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EBoardTermGroupComponent } from './eboard-term-group.component';

describe('EBoardTermGroupComponent', () => {
  let component: EBoardTermGroupComponent;
  let fixture: ComponentFixture<EBoardTermGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EBoardTermGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EBoardTermGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
