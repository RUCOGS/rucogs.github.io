import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEboardTermDialogComponent } from './add-eboard-term-dialog.component';

describe('AddEboardTermDialogComponent', () => {
  let component: AddEboardTermDialogComponent;
  let fixture: ComponentFixture<AddEboardTermDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEboardTermDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddEboardTermDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
