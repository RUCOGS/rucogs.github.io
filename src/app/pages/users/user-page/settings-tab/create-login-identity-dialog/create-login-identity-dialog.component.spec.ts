import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoginIdentityDialogComponent } from './create-login-identity-dialog.component';

describe('CreateLoginIdentityDialogComponent', () => {
  let component: CreateLoginIdentityDialogComponent;
  let fixture: ComponentFixture<CreateLoginIdentityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLoginIdentityDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLoginIdentityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
