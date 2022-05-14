import { TestBed } from '@angular/core/testing';

import { SubpostService } from './subpost.service';
import {HttpClientModule} from "@angular/common/http";

describe('SubpostService', () => {
  let service: SubpostService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(SubpostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
