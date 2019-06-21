import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { Router } from '@angular/router';
import { validMultiFormControl } from '@msp-register/models/validator-helpers';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
import { IMspGroup, IMspOrganization } from '@msp-register/interfaces';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import {
    funcRemoveStrings,
    MSP_REGISTER_ROUTES,
} from '@msp-register/constants';
import { MspRegistrationService } from '@msp-register/msp-registration.service';

@Component({
    selector: 'sitereg-msp-register-review',
    templateUrl: './msp-register-review.component.html',
    styleUrls: ['./msp-register-review.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MspRegisterReviewComponent implements OnInit {
    validFormGroup(): boolean {
        return true;
    }

    constructor(
        private router: Router,
        public loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService,
        public mspRegisterStateSvc: MspRegisterStateService,
        public mspRegDataSvc: MspRegisterDataService,
        private registrationService: MspRegistrationService
    ) {
        // // debug only
        // this.fgs.forEach((fg) => {
        //     fg.valueChanges.subscribe((obs) => console.log(fg));
        // });
    }

    ngOnInit() {
        // console.log(
        //     `%c%o : %o`,
        //     'color:green',
        //     funcRemoveStrings(
        //         ['MspRegister', 'Component'],
        //         this.constructor.name
        //     ).toUpperCase(),
        //     this.globalConfigSvc.applicationId
        // );
        this.registrationService.setItemIncomplete();
    }

    continue() {
        // splunk-log
        this.loggerSvc.logNavigation(
            this.constructor.name,
            `Valid Data - Continue button clicked. ${
            this.globalConfigSvc.applicationId
            }`
        );
        this.registrationService.setItemComplete();

        // REMOVEME debug-only
        this.debugOnly();

        this.router.navigate([MSP_REGISTER_ROUTES.AUTHORIZE.fullpath]);
    }

    mapBooleantoYesNo(val?: boolean) {
        return val && val === true ? 'Yes' : 'No';
    }

    redirectOrganization = () => this.redirect(MSP_REGISTER_ROUTES.ORGANIZATION.fullpath);
    redirectSigningAuthority = () => this.redirect(MSP_REGISTER_ROUTES.SIGNING_AUTHORITY.fullpath);
    redirectAccessAdministrators = () => this.redirect(MSP_REGISTER_ROUTES.ACCESS_ADMINS.fullpath);
    redirectUsers = () => this.redirect(MSP_REGISTER_ROUTES.USERS.fullpath);
    redirectGroupNumbers = () => this.redirect(MSP_REGISTER_ROUTES.GROUP_NUMBERS.fullpath);
  
    redirect(routeName: string) {
        this.router.navigate([routeName]);
    }
    
    // REMOVEME - debug only
    debugOnly() {
        if (this.globalConfigSvc.currentEnironment.production === false) {
            console.log(
                `%c review <= %o\n\t%o`,
                'color:lightgreen',
                funcRemoveStrings(
                    ['MspRegister', 'Component'],
                    this.constructor.name
                ),
            );
        }
    }
    
}
