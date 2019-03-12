import { TestBed } from '@angular/core/testing';

import { ServerPayloadService } from './server-payload.service';

describe('ServerPayloadService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServerPayloadService = TestBed.get(ServerPayloadService);
    expect(service).toBeTruthy();
  });
});
