import { TestBed } from '@angular/core/testing';

import { WenSocketService } from './wen-socket.service';

describe('WenSocketService', () => {
  let service: WenSocketService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WenSocketService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
