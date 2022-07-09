import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkNetIdDialogComponent } from './link-netid-dialog.component';

describe('EditUserPrivateDialogComponent', () => {
  let component: LinkNetIdDialogComponent;
  let fixture: ComponentFixture<LinkNetIdDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkNetIdDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkNetIdDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
