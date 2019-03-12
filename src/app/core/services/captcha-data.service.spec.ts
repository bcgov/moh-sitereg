import { TestBed } from '@angular/core/testing';

import { CaptchaDataService } from './captcha-data.service';

describe('CaptchaDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CaptchaDataService = TestBed.get(CaptchaDataService);
    expect(service).toBeTruthy();
  });
});
