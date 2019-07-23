import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import * as moment from 'moment';
import { environment } from '../../../../../environments/environment.prod';
import { VersionApiService } from '../../version-api.service';
import { UUID } from 'angular2-uuid';

@Component({
    selector: 'sitereg-msp-app-version',
    templateUrl: './app-version.component.html',
    styleUrls: ['./app-version.component.scss'],
})
export class MspDirectAppVersionComponent implements OnInit, OnDestroy {

    captchaApiBaseUrl: string;
    nonce: string;
    versionResponse: string;

    constructor(
        public mspVersionApi: VersionApiService,
    ) {
        this.nonce = UUID.UUID();
    }

    ngOnInit() {
        this.captchaApiBaseUrl = environment.captchaApiBaseUrl;
    }

    ngOnDestroy() {
    }

    setToken(token): void {
        // this.mspUpdateApiSvc.setCaptchaToken(token);
        console.log(token);
        this.mspVersionApi.setCaptchaToken(token);
        this.submit();
    }

    submit() {
        this.mspVersionApi.siteVersionRequest(
            this.nonce
        )
            .toPromise()
            .catch((err) => {

                console.log(`error found: %c %o`, 'color:organge', err);
            })
            .then((result) => {
                console.log('version request complete');
                console.log(result);
            });
    }

}
