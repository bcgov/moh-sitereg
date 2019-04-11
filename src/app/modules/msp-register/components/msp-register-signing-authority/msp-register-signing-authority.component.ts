import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { IUser } from '@msp-register/interfaces';
import {
    validFormControl,
    validMultiFormControl,
} from '@msp-register/models/validator-helpers';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
import { BehaviorSubject } from 'rxjs';
import { cAdministeringFor } from '../../models/core/core-types';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';

@Component({
    selector: 'sitereg-msp-register-signing-authority',
    templateUrl: './msp-register-signing-authority.component.html',
    styleUrls: ['./msp-register-signing-authority.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MspRegisterSigningAuthorityComponent implements OnInit {
    [x: string]: any;
    fg: FormGroup;
    validFormControl: () => boolean;
    administeringFor: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
        cAdministeringFor
    );

    constructor(
        private router: Router,
        public loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService,
        private mspRegisterStateSvc: MspRegisterStateService,
        public mspRegDataSvc: MspRegisterDataService
    ) {
        this.fg = this.mspRegisterStateSvc.mspRegisterSigningAuthorityForm;
        this.validFormControl = validMultiFormControl.bind(this);

        // debug only
        // this.fg.valueChanges.subscribe((obs) => {
        //     console.log(this.fg)
        // });
    }

    ngOnInit() {}

    continue() {
        this.loggerSvc.logNavigation(this.constructor.name, 'ValidForm' );
        this.debugOnly();
        this.router.navigate(['msp-registration/access-admins']);
    }

    debugOnly() {
        if (this.globalConfigSvc.currentEnironment.production === false) {
            const form = this.mspRegisterStateSvc.mspRegisterSigningAuthorityForm;
            console.log('FormGroup: ', form);
            const middleWareObject = this.mspRegDataSvc.mapObjectSigningAuthorityInformationDef(
                form.value
            );
            console.log('MO - Signing Authority:', middleWareObject);
        }
    }
}
