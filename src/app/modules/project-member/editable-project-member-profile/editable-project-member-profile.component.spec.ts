import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditableProjectMemberProfileComponent } from './editable-project-member-profile.component';

describe('EditableProjectMemberProfileComponent', () => {
  let component: EditableProjectMemberProfileComponent;
  let fixture: ComponentFixture<EditableProjectMemberProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditableProjectMemberProfileComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditableProjectMemberProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
