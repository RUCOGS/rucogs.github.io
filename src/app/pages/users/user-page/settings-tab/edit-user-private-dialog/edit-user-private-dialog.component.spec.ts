import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserPrivateDialogComponent } from './edit-user-private-dialog.component';

describe('EditUserPrivateDialogComponent', () => {
  let component: EditUserPrivateDialogComponent;
  let fixture: ComponentFixture<EditUserPrivateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditUserPrivateDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserPrivateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
