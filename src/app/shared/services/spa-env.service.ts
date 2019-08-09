import { Injectable } from '@angular/core';
import { AbstractHttpService } from 'moh-common-lib';
import {
    HttpClient,
    HttpHeaders,
    HttpErrorResponse,
} from '@angular/common/http';
// import { Logger } from './logger.service';
import { LoggerService } from './logger.service';
import { throwError, BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from './../../../environments/environment';
import { retry, filter } from 'rxjs/operators';

/**
 * The list of all server envs we expect back from the spa-env-server. By adding
 * a value here it'll both be retrieved from the server, and the type/interface
 * will be updated.
 */
const serverEnvs = {
    SPA_ENV_SITEREG_MAINTENANCE_FLAG: '',
    SPA_ENV_SITEREG_MAINTENANCE_START: '',
    SPA_ENV_SITEREG_MAINTENANCE_END: '',
    SPA_ENV_SITEREG_MAINTENANCE_MESSAGE: '',
    SPA_ENV_SITEREG_DISABLE_FORM2: false,
    SPA_ENV_SITEREG_DEBUG: false,
};

// Used in HTTP request
const stringifiedEnvs = JSON.stringify(serverEnvs);

/**
 * All the serverEnvs, provided as an object, converted to a type which we can
 * use as an interface or for responses.  By doing it this way, we can
 * accomplish **both** of the following without duplication:
 *
 * 1. Automatically added to the HTTP request
 * 2. Added to the type/interface
 *
 * Thus, we're updating types and modifying runtime behaviour in one stroke.
 */
export type SpaEnvResponse = typeof serverEnvs;

/**
 * Responsible for retrieving values from the spa-env-server on OpenShift.
 *
 * Subscribe to SpaEnvService.values() to get the env values.
 */
@Injectable({
    providedIn: 'root',
})
export class SpaEnvService extends AbstractHttpService {
    // tslint:disable-next-line: variable-name
    protected _headers: HttpHeaders = new HttpHeaders({
        SPA_ENV_NAME: stringifiedEnvs,
    });

    // tslint:disable-next-line: variable-name
    private _values = new BehaviorSubject<SpaEnvResponse>(null);
    /** The values retrieved from the SpaEnv server. */
    public values: Observable<
        SpaEnvResponse
    > = this._values.asObservable().pipe(filter((x) => !!x)); // filter null response out, init value

    constructor(protected http: HttpClient, private logService: LoggerService) {
        super(http);

        // this.logHTTPRequestsToConsole = true;
        this.loadEnvs().subscribe((response) => this._values.next(response));
    }

    private loadEnvs() {
        const url = environment.envServerUrl;

        // When the SpaEnv server is being deployed it can return an HTML error
        // page, and it should resolve shortly, so we try again.
        // if (this.globalConfigSvc.debug) return of(null);
        return this.post<SpaEnvResponse>(url, null).pipe(retry(3));
    }

    protected handleError(error: HttpErrorResponse) {
        console.log('Error handleError: ', error);

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

        this.logService.logHttpError(error);

        // A user facing erorr message /could/ go here; we shouldn't log dev info through the throwError observable
        return throwError('Something went wrong with the network request.');
    }
}
