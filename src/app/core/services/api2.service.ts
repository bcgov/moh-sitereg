// /**
//  * https://raw.githubusercontent.com/bcgov/prime-web/master/projects/prime-registration/src/app/modules/registration/services/register-api.service.ts
//  */
// import { Injectable } from '@angular/core';
// import { AbstractHttpService } from 'moh-common-lib/services';
// import {
//     HttpHeaders,
//     HttpClient,
//     HttpErrorResponse,
// } from '@angular/common/http';
// import { throwError, Observable } from 'rxjs';
// import * as moment from 'moment';
// import { PayloadInterface } from '@core/models/api-base.model';
// import { environment } from '../../../environments/environment';
// import { SiteRegRequest2 } from '@core/models/mo-api.model';
// // import { UserAttrInterface } from '../models/register-api.model';
// // import { Registrant } from '../models/registrant.model';
// // import { RegCredTypes } from '../../../../../../../src/app/models/prime-constants';

// @Injectable({
//     providedIn: 'root',
// })
// export class MspRegisterApiService extends AbstractHttpService {

//     /**
//      *  Default hardcoded header values.  Note: Authentication headers are added
//      *  at runtime in the httpOptions() method.
//      */
//     protected _headers: HttpHeaders = new HttpHeaders();

//     // Client name retrieved from parameter in cache
//     public clientName: string;

//     // Session identifier
//     public eventUUID: string;

//     constructor(protected http: HttpClient) {
//         super(http);
//     }

//     /**
//      *
//      * @param error
//      */
//     protected handleError(error: HttpErrorResponse): any {

//         if (error.error instanceof ErrorEvent) {
//             // Client-side / network error occured
//             console.error('An error occured: ', error.error.message);
//         } else {
//             // The backend returned an unsuccessful response code
//             console.error(`Backend returned error code: ${error.status}.  Error body: ${error.error}`);
//         }
//         // A user facing error message /could/ go here; we shouldn't log dev info through the throwError observable
//         return throwError('Unable to process registration request!');
//     }

//     // private

//     /**
//      * Returns current date in YYYYMMDD HH:MM:SS, e.g. '20180801 12:01:01'
//      */
//     private getProcessDate(): string {
//         return moment().format('YYYYMMDD HH:mm:ss');
//     }



//     /**
//      * Request to create a BCSC Account in PRIME
//      * @param registrant  information pertaining to person who is registering
//      * @param processDate date the request is processed (defaults to today)
//      */
//     registerUser(registrant: SiteRegRequest2, processDate = this.getProcessDate()): Observable<PayloadInterface> {

//         const url = environment.baseAPIUrl + 'registerUser';

//         const params: SiteRegRequest2 = {
//             eventUUID: this.eventUUID,
//             clientName: this.clientName,
//             processDate: processDate,
//             providerCode: registrant.providerCode,
//             assuranceLevel: registrant.assuranceLevel,
//             email: registrant.emailAddress,
//             mobile: this.stripDashes(registrant.smsPhone),
//             securityQuestions: registrant.secQuestionsAnswer,
//             firstname: registrant.firstName,
//             lastname: registrant.lastName,
//             givennames: registrant.firstName + ' ' + registrant.middleName,
//             dateOfBirth: registrant.dateOfBirthShort,
//             preffirstname: registrant.preferredFirstName ? registrant.preferredFirstName : null,
//             preflastname: registrant.preferredMiddleName ? registrant.preferredMiddleName : null,
//             prefmiddlename: registrant.preferredLastName ? registrant.preferredLastName : null,
//             address: this.convertAddress(registrant.address),
//             mailingAddress: !registrant.identityIsMailingAddress ?
//                 this.convertAddress(registrant.mailAddress) : null
//         };

//         return this.post<PayloadInterface>(url, params);
//     }

//     //     /**
//     //      * Get request from the front end to verify user
//     //      * based on Middlware Object
//     //      * @param input
//     //      *    uuid:   Event UUID
//     //      */
//     //     postMiddleWare(uuid: string): Observable<ISiteRegRequest> {

//     //         const url = environment.baseAPIUrl + 'validateUser';

//     //         const params = {

//     //         }
//     //         // const params = (registrant.credType === RegCredTypes.MOH ? {
//     //         //     eventUUID: uuid,
//     //         //     clientName: this._clientName,
//     //         //     processDate: this.getProcessDate(),
//     //         //     providerCode: registrant.credType,
//     //         //     userID: registrant.userAccountName,
//     //         //     email: registrant.emailAddress,
//     //         //     mobile: registrant.smsPhone
//     //         // } : {
//     //         //         eventUUID: uuid,
//     //         //         clientName: this._clientName,
//     //         //         processDate: this.getProcessDate(),
//     //         //         providerCode: registrant.credType,
//     //         //         pdid: registrant.userAccountName,
//     //         //         email: registrant.emailAddress,
//     //         //         mobile: registrant.smsPhone
//     //         //     });

//     //         // return this.post<UserAttrInterface>(url, params);

//     //         return this.post<ISiteRegRequest>(url, params);
//     //     }

// }
