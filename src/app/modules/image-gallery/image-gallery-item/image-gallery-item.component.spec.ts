import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageGalleryItemComponent } from './image-gallery-item.component';

describe('ImageGalleryItemComponent', () => {
  let component: ImageGalleryItemComponent;
  let fixture: ComponentFixture<ImageGalleryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImageGalleryItemComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageGalleryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
