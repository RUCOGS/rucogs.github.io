import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableSocialButtonComponent } from './editable-social-button.component';

describe('EditableSocialButtonComponent', () => {
  let component: EditableSocialButtonComponent;
  let fixture: ComponentFixture<EditableSocialButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditableSocialButtonComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableSocialButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
