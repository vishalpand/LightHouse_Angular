import { TestBed } from '@angular/core/testing';

import { AddraisedIssueService } from './addraised-issue.service';

describe('AddraisedIssueService', () => {
  let service: AddraisedIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddraisedIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
