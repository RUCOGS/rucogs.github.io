import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMembersInputComponent } from './project-members-input.component';

describe('ProjectMembersInputComponent', () => {
  let component: ProjectMembersInputComponent;
  let fixture: ComponentFixture<ProjectMembersInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMembersInputComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMembersInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
