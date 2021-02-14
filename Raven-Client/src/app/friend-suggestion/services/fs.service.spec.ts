import { TestBed } from '@angular/core/testing';

import { FSService } from './fs.service';

describe('FSService', () => {
  let service: FSService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FSService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
