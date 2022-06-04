import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectMembersDisplayComponent } from './project-members-display.component';

describe('ProjectMembersDisplayComponent', () => {
  let component: ProjectMembersDisplayComponent;
  let fixture: ComponentFixture<ProjectMembersDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjectMembersDisplayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectMembersDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
