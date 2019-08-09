import { Injectable } from '@angular/core';
import { AbstractHttpService } from 'moh-common-lib';
import {
    HttpHeaders,
    HttpClient,
    HttpErrorResponse,
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import * as moment from 'moment';
import { UUID } from 'angular2-uuid';

import { PayloadInterface } from '@core/models/api-base.model';
import { environment } from '../../../../environments/environment.prod';
import { ISiteRegRequest } from '@core/interfaces/i-http-data';
import { LoggerService } from '../../../shared/services/logger.service';
import { GlobalConfigService } from '../../../shared/services/global-config.service';
import { UpdateStateService } from './update.state.service';

@Injectable({
    providedIn: 'root',
})
export class MspUpdateApiService extends AbstractHttpService {
    // Session identifier
    public eventUUID: string;

    //#region Captcha

    /**
     *  Default hardcoded header values.  Note: Authentication headers are added
     *  at runtime in the httpOptions() method.
     */
    // tslint:disable-next-line: variable-name
    protected _headers: HttpHeaders = new HttpHeaders({
        'Cache-Control': 'private',
    });
    // tslint:disable-next-line: variable-name
    private _token: string;
    // tslint:disable-next-line: variable-name
    private _clientName = 'sitereg';
    private apiURL: string;

    constructor(
        protected http: HttpClient,
        private globalConfigSvc: GlobalConfigService,
        public logService: LoggerService,
        public updateStateService: UpdateStateService
    ) {
        super(http);
        this.apiURL = this.globalConfigSvc.currentEnironment.baseUpdateAPIUrl;

        this.eventUUID = this.globalConfigSvc.applicationId;
    }

    public setCaptchaToken(token: string) {
        this._token = token;
        this._headers = this._headers.set(
            'X-Authorization',
            `Bearer ${this._token}`
        );

        // if (!environment.production) {
        //     console.log('ApiService token set:', {
        //         token: this._token,
        //         headers: this._headers,
        //     });
        // }
    }

    //#endregion

    /**
     *
     * @param error : Error Handlers
     */
    protected handleError(error: HttpErrorResponse): any {
        if (error.error instanceof ErrorEvent) {
            // Client-side / network error occured
            console.error('An error occured: ', error.error.message);
        } else {
            // The backend returned an unsuccessful response code
            console.error(
                `Backend returned error code: ${error.status}.  Error body: ${error.error}`
            );
        }
        // A user facing error message /could/ go here; we shouldn't log dev info through the throwError observable
        return throwError('Unable to process registration request!');
    }

    // private

    /**
     * Returns current date in YYYYMMDD HH:MM:SS, e.g. '20180801 12:01:01'
     */
    private getProcessDate(): string {
        return moment().format('YYYYMMDD HH:mm:ss');
    }

    /**
     * Request to create a MSP Direct Account
     * @param registrant  information pertaining to person who is registering
     * @param processDate date the request is processed (defaults to today)
     */
    siteUpdateRequest(
        siteUpdateRequest: any,
        processDate = this.getProcessDate(),
        uuid
    ): Observable<PayloadInterface> {
        // disabled to keep log of the application all steps.
        // this.eventUUID = UUID.UUID();

        const url = environment.baseUpdateAPIUrl + `${uuid}`;

        // console.log(`nonce & applicationid: %o`, GlobalConfigService.uuid );

        // // REMOVEME
        // const testMiddlewareURL = 'http://localhost:5200';
        // const url = testMiddlewareURL + environment.baseAPIUrl + `${this.eventUUID}`;
        // console.log(url);

        // const body = {
        //     // eventUUID: this.eventUUID,
        //     clientName: this._clientName,
        //     request_num: siteRegRequest.request_num,
        //     org_information: siteRegRequest.org_information,
        //     signing_authority_information:
        //         siteRegRequest.signing_authority_information,
        //     aa_same_as_sa: siteRegRequest.aa_same_as_sa,
        //     access_administrator: siteRegRequest.access_administrator,
        //     users: siteRegRequest.users,
        //     msp_group: siteRegRequest.msp_group,
        // };

        // const body = {
        //     // clientName: this._clientName,
        //     request_uuid: siteUpdateRequest.request_uuid,
        //     request_num: siteUpdateRequest.request_num,
        //     org_information: siteUpdateRequest.org_information,
        //     signing_authority_information:
        //         siteUpdateRequest.signing_authority_information,
        //     aa_same_as_sa: siteUpdateRequest.aa_same_as_sa,
        //     access_administrator: siteUpdateRequest.access_administrator,
        //     users: siteUpdateRequest.users,
        //     msp_group: siteUpdateRequest.msp_group,
        //     authorizedBySA: siteUpdateRequest.authorizedBySA,
        //     authorizedDate: siteUpdateRequest.authorizedDate,
        //     applicationType: siteUpdateRequest.applicationType,
        // };
        const body = siteUpdateRequest;

        // console.log(`%c  url: %o body: %o `, 'color:blue', url, body);

        return this.post<PayloadInterface>(url, body);
        // return this.post<ISiteRegRequest>(url, params);
    }
}
