import { TestBed } from '@angular/core/testing';

import { GenrePricingService } from './genre-pricing.service';

describe('GenrePricingService', () => {
  let service: GenrePricingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GenrePricingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
