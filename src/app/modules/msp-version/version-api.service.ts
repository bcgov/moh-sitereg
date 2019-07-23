import { Injectable } from '@angular/core';
// import {
//     SpaEnvService,
//     SpaEnvResponse,
// } from '../../shared/services/spa-env.service';
import { Router } from '@angular/router';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UUID } from 'angular2-uuid';
import { AbstractHttpService } from 'moh-common-lib';
import { PayloadInterface } from '@core/models/api-base.model';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class VersionApiService extends AbstractHttpService {

    //#region API Version

    // Session identifier
    // public eventUUID: string;

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
    // private apiURL: string;

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
                `Backend returned error code: ${error.status}.  Error body: ${
                error.error
                }`
            );
        }
        // A user facing error message /could/ go here; we shouldn't log dev info through the throwError observable
        return throwError('Unable to process registration request!');
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

    constructor(
        public http: HttpClient,
        private router: Router
    ) {
        super(http);
        // this.apiURL = environment.baseAPIUrl;
    }


    /**
     * Returns current date in YYYYMMDD HH:MM:SS, e.g. '20180801 12:01:01'
     */
    private getProcessDate(): string {
        return moment().format('YYYYMMDD HH:mm:ss');
    }

    siteVersionRequest(
        uuid
    ): Observable<PayloadInterface> {
        // disabled to keep log of the application all steps.
        // this.eventUUID = UUID.UUID();
        const processDate = this.getProcessDate();

        // // server not found any matchin url
        // const url = environment.baseVersionAPIUrl + `${uuid}`;

        // error body null
        const url = environment.baseVersionAPIUrl;

        // console.log(`%c  url: %o body: %o `, 'color:blue', url, body);

        return this.post<PayloadInterface>(url, {});
    }

    //#region SPA service

    // private loaded = false;
    // public maintenanceMode: boolean = null;

    // // tslint:disable-next-line: variable-name
    // private _values = new BehaviorSubject<SpaEnvResponse>(null);
    // /**
    //  * Currently this is all the values from the SpaEnvService, because all those
    //  * values are used for the splash service.
    //  */
    // public values: Observable<
    //     SpaEnvResponse
    // > = this._values.asObservable().pipe(distinctUntilChanged());

    // constructor(
    //     private http: HttpClient,
    //     private envService: SpaEnvService,
    //     private router: Router
    // ) {
    //     super(http);
    //     this.apiURL = environment.baseAPIUrl;
    //     this.eventUUID = UUID.UUID();
    // }

    // /**
    //  * Check if maitenance mode is active, and if so redirect to splash page.
    //  */
    // public setup(): void {
    //     this.load().then((isMaitenance) => {
    //         if (isMaitenance) {
    //             this.router.navigate(['maintenance']);
    //         }
    //     });
    // }

    // public load(): Promise<boolean> {
    //     return new Promise((resolve, reject) => {
    //         if (this.loaded) {
    //             resolve(this.maintenanceMode);
    //         } else {
    //             this.envService.values.subscribe((envs) => {
    //                 // console.log('ENVIORMENT:%o', envs);
    //                 this.loaded = true;
    //                 this.maintenanceMode =
    //                     envs.SPA_ENV_SITEREG_MAINTENANCE_FLAG.toLowerCase() ===
    //                     'true';
    //                 this._values.next(envs);
    //                 resolve(this.maintenanceMode);
    //             });
    //         }
    //     });
    // }

    //#endregion
}
