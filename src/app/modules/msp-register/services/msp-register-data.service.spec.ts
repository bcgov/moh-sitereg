import { TestBed } from '@angular/core/testing';

import { MspRegisterDataService } from './msp-register-data.service';

describe('MspRegisterDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MspRegisterDataService = TestBed.get(MspRegisterDataService);
    expect(service).toBeTruthy();
  });
});
