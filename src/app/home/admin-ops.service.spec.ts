import { TestBed } from '@angular/core/testing';

import { AdminOpsService } from './admin-ops.service';

describe('AdminOpsService', () => {
  let service: AdminOpsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminOpsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
