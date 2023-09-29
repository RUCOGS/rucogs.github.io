import { TestBed } from '@angular/core/testing';

import { AuthSetupService } from './auth-setup.service';

describe('AuthSetupService', () => {
  let service: AuthSetupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthSetupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
