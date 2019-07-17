import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { funcRemoveStrings } from '@msp-register/constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { environment } from '../../../../../environments/environment.prod';
import { MspRegisterApiService } from '../../../../shared/services/api.service';
import { UpdateStateService } from '../../services/update.state.service';
import { jsonPayLoadApplication } from './json-payload';

@Component({
    selector: 'sitereg-msp-update-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.scss'],
})
export class MspDirectUpdateSubmitComponent implements OnInit {

    public captchaApiBaseUrl;
    // tslint:disable-next-line:variable-name
    private _hasToken = false;

    get componentInfo(): string {
        return (
            `${funcRemoveStrings(
                ['MspDirectUpdate', 'Component'],
                this.constructor.name
            ).toUpperCase()} :` + ` ${this.globalConfigSvc.applicationId}`
        );
    }

    constructor(
        private router: Router,
        private progressService: MspDirectUpdateProgressService,
        private loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService,
        public apiSvc: MspRegisterApiService,
        public updateStateService: UpdateStateService,
    ) {

      this.captchaApiBaseUrl = environment.captchaApiBaseUrl;
    }

    /** Use the UUID as a cryptographic client nonce to avoid replay attacks. */
    get nonce(): string {
      return this.globalConfigSvc.applicationId;
    }

    setToken(token): void {
      this._hasToken = true;
      this.apiSvc.setCaptchaToken(token);
  }

    ngOnInit() {
        console.log(`%c%o : %o`, 'color:green', this.componentInfo);
        this.progressService.setPageIncomplete();
    }

    continue() {
        // splunk-log
        this.loggerSvc.logNavigation(
            this.constructor.name,
            `Valid Data - Continue button clicked. ${
                this.globalConfigSvc.applicationId
            }`
        );
        this.progressService.enableConfirmation = true;
        this.progressService.setPageComplete();
        this.router.navigate([ROUTES_UPDATE.CONFIRMATION.fullpath]);
    }

    canContinue() {
      return this._hasToken;
    }

    json() {
        this.updateStateService.applicationId = this.globalConfigSvc.applicationId;
        return jsonPayLoadApplication(this.updateStateService);
      }
}
