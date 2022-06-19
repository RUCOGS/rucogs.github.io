import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StringArrayInputComponent } from './string-array-input.component';

describe('StringArrayInputComponent', () => {
  let component: StringArrayInputComponent;
  let fixture: ComponentFixture<StringArrayInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StringArrayInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StringArrayInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
