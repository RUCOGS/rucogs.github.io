import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEboardTermDialogComponent } from './edit-eboard-term-dialog.component';

describe('EditEboardTermDialogComponent', () => {
  let component: EditEboardTermDialogComponent;
  let fixture: ComponentFixture<EditEboardTermDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditEboardTermDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditEboardTermDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
