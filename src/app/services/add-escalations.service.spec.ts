import { TestBed } from '@angular/core/testing';

import { AddEscalationsService } from './add-escalations.service';

describe('AddEscalationsService', () => {
  let service: AddEscalationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddEscalationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
