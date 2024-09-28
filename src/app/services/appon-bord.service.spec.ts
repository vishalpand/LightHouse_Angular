import { TestBed } from '@angular/core/testing';

import { ApponBordService } from './appon-bord.service';

describe('ApponBordService', () => {
  let service: ApponBordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApponBordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
