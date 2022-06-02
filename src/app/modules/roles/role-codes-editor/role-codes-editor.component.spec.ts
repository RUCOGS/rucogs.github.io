import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleCodesEditorComponent } from './role-codes-editor.component';

describe('RoleCodesEditorComponent', () => {
  let component: RoleCodesEditorComponent;
  let fixture: ComponentFixture<RoleCodesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleCodesEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleCodesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
