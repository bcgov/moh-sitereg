import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { IUser, IMspSigningAuthority } from '@msp-register/interfaces';
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

        // // debug only
        // this.fg.valueChanges.subscribe((obs) => {
        //     console.log(obs);
        // });
    }

    ngOnInit() { }

    continue() {
        this.loggerSvc.logNavigation(this.constructor.name, 'ValidForm');
        this.debugOnly();
        this.addSingingAuthorityAsAdmin();
        this.router.navigate(['msp-registration/access-admins']);
    }

    addSingingAuthorityAsAdmin(): void {

        const directMspAccess = this.fg.get('directMspAccess');
        if (directMspAccess) {
            this.mspRegisterStateSvc.addAdmin();
            const admins = this.mspRegisterStateSvc.mspRegisterAccessAdminsForm;
            if (admins && admins.length > 0) {
                const sa = this.mspRegisterStateSvc.mspRegisterSigningAuthorityForm.value;
                // console.log(sa);
                // todo - verify is signing authority is already in the admin lists
                // TBD - remove signing authority, or click no - 
                //       what should be happening in case if user already have users,
                //       should i use email
                const saAdmin = admins[0];
                saAdmin.patchValue({
                    userTitle: sa.userTitle,
                    firstName: sa.firstName,
                    initial: sa.initial,
                    lastName: sa.lastName,
                    jobTitle: sa.jobTitle,
                    emailAddress: sa.emailAddress,
                    confirmEmail: sa.confirmEmail,
                    phone: sa.phone,
                    ext: sa.ext,
                    fax: sa.fax,
                    administeringFor: sa.administeringFor,
                    directMspAccess: true,
                });
            }
        }
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
