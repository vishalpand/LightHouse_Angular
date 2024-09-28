import { TestBed } from '@angular/core/testing';

import { SkippedIssueService } from './skipped-issue.service';

describe('SkippedIssueService', () => {
  let service: SkippedIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SkippedIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
