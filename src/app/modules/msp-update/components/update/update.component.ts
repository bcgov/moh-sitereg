import { Component, OnInit } from '@angular/core';
import { Container } from 'moh-common-lib';
import { Router } from '@angular/router';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { routes } from '../../routing/routes';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { funcRemoveStrings } from '@msp-register/constants';
import { LoggerService } from '@shared/services/logger.service';

@Component({
    selector: 'sitereg-msp-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.sass'],
})
export class MspDirectUpdateComponent extends Container implements OnInit {
    get componentInfo(): string {
        return (
            `${funcRemoveStrings(
                ['MspDirectUpdate', 'Component'],
                this.constructor.name
            ).toUpperCase()} :` + ` ${this.globalConfigSvc.applicationId}`
        );
    }

    showStepper(): boolean {
        return !this.progressService.enableConfirmation;
    }

    constructor(
        private router: Router,
        private progressService: MspDirectUpdateProgressService,
        private loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService
    ) {
        super();
        this.setProgressItems();
    }

    ngOnInit() {
        // this.globalConfigSvc.logRefreshMspApplicationUUID();
        console.log(
            `%c %o \n MSP Application id: %o`,
            'color:green',
            funcRemoveStrings(['Component'], this.constructor.name),
            this.globalConfigSvc.applicationId
        );

        this.progressService.getUpdateItems();

        console.log('ANSWER:%o', this.showStepper());
    }

    setProgressItems() {
        const progressItemRoute = routes.filter((x) => {
            return !(x.path.includes('_') || x.path.includes('confirmation'));
        });

        this.setProgressSteps(progressItemRoute);
        console.log('PATH: %o', this.router.url);
    }
}
