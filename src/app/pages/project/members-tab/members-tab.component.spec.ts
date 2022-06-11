import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MembersTabComponent } from './members-tab.component';

describe('MembersTabComponent', () => {
  let component: MembersTabComponent;
  let fixture: ComponentFixture<MembersTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MembersTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MembersTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
