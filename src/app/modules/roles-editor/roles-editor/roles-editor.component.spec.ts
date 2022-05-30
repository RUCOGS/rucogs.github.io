import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesEditorComponent } from './roles-editor.component';

describe('RolesEditorComponent', () => {
  let component: RolesEditorComponent;
  let fixture: ComponentFixture<RolesEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
