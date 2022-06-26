import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EboardProfileComponent } from './eboard-profile.component';

describe('EboardProfileComponent', () => {
  let component: EboardProfileComponent;
  let fixture: ComponentFixture<EboardProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EboardProfileComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EboardProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
