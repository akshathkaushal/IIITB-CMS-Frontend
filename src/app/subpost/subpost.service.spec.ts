import { TestBed } from '@angular/core/testing';

import { SubpostService } from './subpost.service';

describe('SubpostService', () => {
  let service: SubpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
