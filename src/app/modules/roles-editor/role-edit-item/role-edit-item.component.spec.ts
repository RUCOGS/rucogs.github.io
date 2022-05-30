import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleEditItemComponent } from './role-edit-item.component';

describe('RoleEditItemComponent', () => {
  let component: RoleEditItemComponent;
  let fixture: ComponentFixture<RoleEditItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleEditItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleEditItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
