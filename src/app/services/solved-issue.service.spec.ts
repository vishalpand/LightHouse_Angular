import { TestBed } from '@angular/core/testing';

import { SolvedIssueService } from './solved-issue.service';

describe('SolvedIssueService', () => {
  let service: SolvedIssueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolvedIssueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
