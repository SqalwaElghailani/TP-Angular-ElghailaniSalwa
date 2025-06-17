import { TestBed } from '@angular/core/testing';

import { CommendeService } from './commende.service';

describe('CommendeService', () => {
  let service: CommendeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommendeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
