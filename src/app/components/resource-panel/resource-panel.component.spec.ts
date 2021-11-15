import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResourcePanelComponent } from './resource-panel.component';

describe('ResourcePanelComponent', () => {
  let component: ResourcePanelComponent;
  let fixture: ComponentFixture<ResourcePanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResourcePanelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResourcePanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
