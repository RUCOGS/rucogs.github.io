import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesDisplayComponent } from './roles-display.component';

describe('RolesDisplayComponent', () => {
  let component: RolesDisplayComponent;
  let fixture: ComponentFixture<RolesDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
