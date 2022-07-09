import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkRutgersEmailDialogComponent } from './link-rutgers-email-dialog.component';

describe('EditUserPrivateDialogComponent', () => {
  let component: LinkRutgersEmailDialogComponent;
  let fixture: ComponentFixture<LinkRutgersEmailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinkRutgersEmailDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkRutgersEmailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
