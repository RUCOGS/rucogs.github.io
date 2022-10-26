import { TestBed } from '@angular/core/testing';

import { SEOService } from './seo.service';

describe('SEOServiceService', () => {
  let service: SEOService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SEOService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
