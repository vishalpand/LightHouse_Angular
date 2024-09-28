import { TestBed } from '@angular/core/testing';

import { EcalatesService } from './ecalates.service';

describe('EcalatesService', () => {
  let service: EcalatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EcalatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
