import { Component, OnInit } from '@angular/core';
import { Container } from 'moh-common-lib/models';
import { Router } from '@angular/router';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { routes } from '../../routing/routes';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { funcRemoveStrings } from '@msp-register/constants';

@Component({
    selector: 'sitereg-msp-update',
    templateUrl: './update.component.html',
    styleUrls: ['./update.component.sass'],
})
export class MspDirectUpdateComponent extends Container implements OnInit {
    showStepper(): boolean {
        return !this.progressItemsService.enableConfirmation;
    }

    constructor(
        private progressItemsService: MspDirectUpdateProgressService,
        private router: Router,
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

        this.progressItemsService.getUpdateItems();

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
