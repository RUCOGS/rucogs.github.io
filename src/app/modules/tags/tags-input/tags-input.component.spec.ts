import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsInputComponent } from './tags-input.component';

describe('TagsEditorComponent', () => {
  let component: TagsInputComponent;
  let fixture: ComponentFixture<TagsInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TagsInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TagsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
