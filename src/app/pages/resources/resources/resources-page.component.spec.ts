import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcesPageComponent } from './resources.component';

describe('ResourcesComponent', () => {
  let component: ResourcesPageComponent;
  let fixture: ComponentFixture<ResourcesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResourcesPageComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
