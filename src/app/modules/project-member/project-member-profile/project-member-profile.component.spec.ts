import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMemberDisplayComponent } from './project-member-display.component';

describe('ProjectMemberDisplayComponent', () => {
  let component: ProjectMemberDisplayComponent;
  let fixture: ComponentFixture<ProjectMemberDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectMemberDisplayComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMemberDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
