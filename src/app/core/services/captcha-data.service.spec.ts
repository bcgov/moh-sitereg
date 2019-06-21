import { TestBed } from '@angular/core/testing';

import { CaptchaDataService } from './captcha-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/**
 * TODO: Needs to be removed - captcha exists in the moh-common-lib
 */
describe('CaptchaDataService', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
        })
    );

    it('should be created', () => {
        const service: CaptchaDataService = TestBed.get(CaptchaDataService);
        expect(service).toBeTruthy();
    });
});
