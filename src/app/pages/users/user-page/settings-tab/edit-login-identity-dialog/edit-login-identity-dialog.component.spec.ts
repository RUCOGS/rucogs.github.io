import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLoginIdentityDialogComponent } from './edit-login-identity-dialog.component';

describe('EditLoginIdentityDialogComponent', () => {
  let component: EditLoginIdentityDialogComponent;
  let fixture: ComponentFixture<EditLoginIdentityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditLoginIdentityDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLoginIdentityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
