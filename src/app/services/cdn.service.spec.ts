import { TestBed } from '@angular/core/testing';

import { CdnService } from './cdn.service';

describe('CdnService', () => {
  let service: CdnService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CdnService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
