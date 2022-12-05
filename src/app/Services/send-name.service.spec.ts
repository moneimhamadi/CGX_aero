import { TestBed } from '@angular/core/testing';

import { SendNameService } from './send-name.service';

describe('SendNameService', () => {
  let service: SendNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SendNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
