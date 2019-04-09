/**
 * https://raw.githubusercontent.com/bcgov/prime-web/master/projects/prime-registration/src/app/modules/registration/services/register-api.service.ts
 */
import { Injectable } from '@angular/core';
import { AbstractHttpService } from 'moh-common-lib/services';
import {
    HttpHeaders,
    HttpClient,
    HttpErrorResponse,
} from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import * as moment from 'moment';
import { PayloadInterface } from '@core/models/api-base.model';
import { environment } from '../../../environments/environment';
import { SiteRegRequest2, ISiteRegRequest2 } from '@core/models/mo-api.model';
import { UUID } from 'angular2-uuid';
import { ISiteRegRequest } from '@core/interfaces/i-http-data';

@Injectable({
    providedIn: 'root',
})
export class MspRegisterApiService extends AbstractHttpService {

    /**
     *  Default hardcoded header values.  Note: Authentication headers are added
     *  at runtime in the httpOptions() method.
     */
    protected _headers: HttpHeaders = new HttpHeaders();

    // Client name retrieved from parameter in cache
    public clientName: string;

    // Session identifier
    public eventUUID: string;

    constructor(protected http: HttpClient) {
        super(http);
    }

    /**
     *
     * @param error
     */
    protected handleError(error: HttpErrorResponse): any {

        if (error.error instanceof ErrorEvent) {
            // Client-side / network error occured
            console.error('An error occured: ', error.error.message);
        } else {
            // The backend returned an unsuccessful response code
            console.error(`Backend returned error code: ${error.status}.  Error body: ${error.error}`);
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
    siteRegisterationRequest(siteRegRequest: ISiteRegRequest, processDate = this.getProcessDate()): Observable<PayloadInterface> {

        this.eventUUID = UUID.UUID();

        // const url = environment.baseAPIUrl + `${this.eventUUID}`;

        // REMOVEME
        const testMiddlewareURL = 'http://localhost:5200';
        const url = testMiddlewareURL + environment.baseAPIUrl + `${this.eventUUID}`;

        // const params: SiteRegRequest2 = {
        //     eventUUID: this.eventUUID,
        //     clientName: this.clientName,
        // };
        const params  = {
            eventUUID: this.eventUUID,
            clientName: this.clientName,
        };

        return this.post<PayloadInterface>(url, params);
    }

    //     /**
    //      * Get request from the front end to verify user
    //      * based on Middlware Object
    //      * @param input
    //      *    uuid:   Event UUID
    //      */
    //     postMiddleWare(uuid: string): Observable<ISiteRegRequest> {

    //         const url = environment.baseAPIUrl + 'validateUser';

    //         const params = {

    //         }
    //         // const params = (registrant.credType === RegCredTypes.MOH ? {
    //         //     eventUUID: uuid,
    //         //     clientName: this._clientName,
    //         //     processDate: this.getProcessDate(),
    //         //     providerCode: registrant.credType,
    //         //     userID: registrant.userAccountName,
    //         //     email: registrant.emailAddress,
    //         //     mobile: registrant.smsPhone
    //         // } : {
    //         //         eventUUID: uuid,
    //         //         clientName: this._clientName,
    //         //         processDate: this.getProcessDate(),
    //         //         providerCode: registrant.credType,
    //         //         pdid: registrant.userAccountName,
    //         //         email: registrant.emailAddress,
    //         //         mobile: registrant.smsPhone
    //         //     });

    //         // return this.post<UserAttrInterface>(url, params);

    //         return this.post<ISiteRegRequest>(url, params);
    //     }

}
