import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ServerPayload {
    nonce: string;
    captcha: string;
    validation: string;
    expiry: string;
}
