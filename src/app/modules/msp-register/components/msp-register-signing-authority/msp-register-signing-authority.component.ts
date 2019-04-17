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

        const mspAccess = 'directMspAccess';
        this.fg.controls[mspAccess].valueChanges.subscribe((obs) => {
            // console.log(obs);
            this.updateSingingAuthorityAsAdmin();
        });
    }

    ngOnInit() {}

    continue() {
        this.loggerSvc.logNavigation(
            this.constructor.name,
            'valid data - continue clicked'
        );
        this.updateSingingAuthorityAsAdmin();
        this.debugOnly();
        this.router.navigate(['msp-registration/access-admins']);
    }

    //#region update Singing Authority as Access Admin

    compare(newObject, origional) {
        return (
            newObject.userTitle === origional.userTitle &&
            newObject.firstName === origional.firstName &&
            newObject.initial === origional.initial &&
            newObject.lastName === origional.lastName &&
            newObject.jobTitle === origional.jobTitle &&
            newObject.emailAddress === origional.emailAddress &&
            newObject.confirmEmail === origional.confirmEmail &&
            newObject.phone === origional.phone &&
            newObject.ext === origional.ext &&
            newObject.fax === origional.fax &&
            newObject.administeringFor === origional.administeringFor
            // newObject.directMspAccess === origional.directMspAccess
        );
    }

    updateSingingAuthorityAsAdmin(): void {
        const directMspAccess = this.fg.get('directMspAccess');
        if (directMspAccess) {
            let saAdmin: any;
            const admins = this.mspRegisterStateSvc.mspRegisterAccessAdminsForm;
            if (admins) {
                const saAdmins = admins.filter((admin) => {
                    return this.compare(admin.value, this.fg.value);
                });

                // // debug only
                // saAdmins.forEach((element) => {
                //     console.log(
                //         `%c existing SA as Admin %o`,
                //         'color:orange',
                //         element.value
                //     );
                // });

                // if SA Admin already existing fetch otherwise add new
                saAdmin =
                    saAdmins && saAdmins.length === 1
                        ? saAdmins[0]
                        : directMspAccess.value === true
                        ? this.mspRegisterStateSvc.addAdmin()
                        : null;
            }

            // block - updating values
            if (saAdmin && directMspAccess.value === true) {
                const sa = this.mspRegisterStateSvc
                    .mspRegisterSigningAuthorityForm.value;
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

            if (saAdmin && directMspAccess.value === false) {
                // remove SA as Admin
                const index = this.mspRegisterStateSvc.mspRegisterAccessAdminsForm.indexOf(
                    saAdmin
                );
                // debug only
                // console.log(`index to remove SA as Admin ${index}`);
                this.mspRegisterStateSvc.mspRegisterAccessAdminsForm.splice(
                    index
                );
            }
        }
    }

    //#endregion

    debugOnly() {
        if (this.globalConfigSvc.currentEnironment.production === false) {
            const form = this.mspRegisterStateSvc
                .mspRegisterSigningAuthorityForm;
            console.log('FormGroup: ', form);
            const middleWareObject = this.mspRegDataSvc.mapObjectSigningAuthorityInformationDef(
                form.value
            );
            console.log('MO - Signing Authority:', middleWareObject);
        }
    }
}
