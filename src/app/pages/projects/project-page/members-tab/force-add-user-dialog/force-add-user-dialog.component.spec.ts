import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForceAddUserDialogComponent } from './force-add-user-dialog.component';

describe('ForceAddUserDialogComponent', () => {
  let component: ForceAddUserDialogComponent;
  let fixture: ComponentFixture<ForceAddUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ForceAddUserDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ForceAddUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
