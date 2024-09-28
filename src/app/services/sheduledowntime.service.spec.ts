import { TestBed } from '@angular/core/testing';

import { SheduledowntimeService } from './sheduledowntime.service';

describe('SheduledowntimeService', () => {
  let service: SheduledowntimeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SheduledowntimeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
