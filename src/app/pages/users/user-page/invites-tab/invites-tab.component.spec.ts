import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvitesTabComponent } from './invites-tab.component';

describe('InvitesTabComponent', () => {
  let component: InvitesTabComponent;
  let fixture: ComponentFixture<InvitesTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvitesTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvitesTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
