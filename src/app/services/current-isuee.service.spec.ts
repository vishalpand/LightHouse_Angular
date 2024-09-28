import { TestBed } from '@angular/core/testing';

import { CurrentIsueeService } from './current-isuee.service';

describe('CurrentIsueeService', () => {
  let service: CurrentIsueeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CurrentIsueeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
