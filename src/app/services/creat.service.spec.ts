import { TestBed } from '@angular/core/testing';

import { CreatService } from './creat.service';

describe('CreatService', () => {
  let service: CreatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
