import { TestBed } from '@angular/core/testing';

import { ServerPayload } from './server-payload.service';

describe('ServerPayloadService', () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it('should be created', () => {
        const service: ServerPayload = TestBed.get(ServerPayload);
        expect(service).toBeTruthy();
    });
});
