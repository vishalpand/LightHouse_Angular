import { TestBed } from '@angular/core/testing';

import { HarstatusService } from './harstatus.service';

describe('HarstatusService', () => {
  let service: HarstatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HarstatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
