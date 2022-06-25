import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EboardTabComponent } from './eboard-tab.component';

describe('EboardTabComponent', () => {
  let component: EboardTabComponent;
  let fixture: ComponentFixture<EboardTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EboardTabComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EboardTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
