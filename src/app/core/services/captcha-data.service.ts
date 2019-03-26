import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ServerPayload } from './server-payload.service';

@Injectable({
    providedIn: 'root',
})
export class CaptchaDataService {
    constructor(private httpClient: HttpClient) {}
    // private http: Http) { }

    public fetchData(
        apiBaseUrl: string,
        nonce: string
    ): Observable<HttpResponse<ServerPayload>> {
        return this.httpClient.post<ServerPayload>(
            apiBaseUrl + '/captcha',
            { nonce: nonce },
            { observe: 'response' }
        );
    }

    public verifyCaptcha(
        apiBaseUrl: string,
        nonce: string,
        answer: string,
        encryptedAnswer: string
    ): Observable<HttpResponse<ServerPayload>> {
        return this.httpClient.post<ServerPayload>(
            apiBaseUrl + '/verify/captcha',
            { nonce: nonce, answer: answer, validation: encryptedAnswer },
            { observe: 'response' }
        );
    }

    public fetchAudio(
        apiBaseUrl: string,
        validation: string,
        translation?: string
    ) {
        let payload: any = { validation: validation };
        if (translation) {
            payload.translation = translation;
        }
        return this.httpClient.post<string>(
            apiBaseUrl + '/captcha/audio',
            payload,
            { observe: 'response' }
        );
    }
}
