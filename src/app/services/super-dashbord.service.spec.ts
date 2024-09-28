import { TestBed } from '@angular/core/testing';

import { SuperDashbordService } from './super-dashbord.service';

describe('SuperDashbordService', () => {
  let service: SuperDashbordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperDashbordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
