import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { funcRemoveStrings } from '@msp-register/constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { stringify } from '@angular/compiler/src/util';
import { UpdateStateService } from '../../services/update.state.service';

@Component({
    selector: 'sitereg-msp-update-identify',
    templateUrl: './identify.component.html',
    styleUrls: ['./identify.component.sass'],
})
export class MspDirectUpdateIdentifyComponent implements OnInit, AfterViewInit {
    @ViewChild('consentModal') consentModal;

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
        private updateStateService: UpdateStateService
    ) {}

    ngOnInit() {
        console.log(`%c%o : %o`, 'color:green', this.componentInfo);
        this.progressService.setItemIncomplete();
    }

    ngAfterViewInit() {
        if (!this.updateStateService.hasConsentedToInformationCollection) {
            this.consentModal.showFullSizeView();
        }
    }

    continue() {
        // splunk-log
        this.loggerSvc.logNavigation(
            this.constructor.name,
            `Valid Data - Continue button clicked. ${
                this.globalConfigSvc.applicationId
            }`
        );

        this.progressService.setItemComplete();
        this.router.navigate([ROUTES_UPDATE.ORGANIZATION.fullpath]);
    }


    onAcceptCollectionNotice(accepted: boolean) {
        this.updateStateService.hasConsentedToInformationCollection = accepted;
    }
}
