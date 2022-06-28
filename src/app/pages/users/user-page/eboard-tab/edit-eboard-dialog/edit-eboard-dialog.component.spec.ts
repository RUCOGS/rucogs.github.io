import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEboardDialogComponent } from './edit-eboard-dialog.component';

describe('EditEboardDialogComponent', () => {
  let component: EditEboardDialogComponent;
  let fixture: ComponentFixture<EditEboardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEboardDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditEboardDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
