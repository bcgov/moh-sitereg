import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { validMultiFormControl } from '@msp-register/models/validator-helpers';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
import { BehaviorSubject } from 'rxjs';
import { cAdministeringFor } from '../../models/core/core-types';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import {
    funcRemoveStrings,
    MSP_REGISTER_ROUTES,
} from '@msp-register/constants';
import { MspRegistrationService } from '@msp-register/msp-registration.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'sitereg-msp-register-signing-authority',
    templateUrl: './msp-register-signing-authority.component.html',
    styleUrls: ['./msp-register-signing-authority.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MspRegisterSigningAuthorityComponent implements OnInit {
    public get environment(): any {
        return environment;
    }
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
        public mspRegDataSvc: MspRegisterDataService,
        private registrationService: MspRegistrationService
    ) {
        this.fg = this.mspRegisterStateSvc.mspRegisterSigningAuthorityForm;
        this.validFormControl = validMultiFormControl.bind(this);

        // adds or updates singing authority as admin
        const mspAccess = 'directMspAccess';
        this.fg.controls[mspAccess].valueChanges.subscribe((obs) => {
            this.updateSingingAuthorityAsAdmin();
        });
    }

    ngOnInit() {
        console.log(
            `%c%o : %o`,
            'color:green',
            funcRemoveStrings(
                ['MspRegister', 'Component'],
                this.constructor.name
            ).toUpperCase(),
            this.globalConfigSvc.applicationId
        );
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

        this.updateSingingAuthorityAsAdmin();

        this.registrationService.setItemComplete();

        this.router.navigate([MSP_REGISTER_ROUTES.ACCESS_ADMINS.fullpath]);
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

    // REMOVEME - debug only
    schemaObject() {
        if (!environment.debug) return;
        const form = this.mspRegisterStateSvc
            .mspRegisterSigningAuthorityForm;
        // console.log('FormGroup: ', form);
        const middleWareObject = this.mspRegDataSvc.mapObjectSigningAuthorityInformationDef(
            form.value
        );
        // console.log(
        //     `%c middleware object <= %o\n\t%o`,
        //     'color:lightgreen',
        //     funcRemoveStrings(
        //         ['MspRegister', 'Component'],
        //         this.constructor.name
        //     ),
        //     middleWareObject
        // );
        return middleWareObject;
    }
}
