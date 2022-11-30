import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEboardTermDialogComponent } from './create-eboard-term-dialog.component';

describe('CreateEboardTermDialogComponent', () => {
  let component: CreateEboardTermDialogComponent;
  let fixture: ComponentFixture<CreateEboardTermDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEboardTermDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEboardTermDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
