import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { funcRemoveStrings } from '@msp-register/constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';

@Component({
    selector: 'sitereg-msp-update-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.scss'],
})
export class MspDirectUpdateSubmitComponent implements OnInit {
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
        private globalConfigSvc: GlobalConfigService
    ) {}

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
}
