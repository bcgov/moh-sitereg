import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
    MspRegisterStateService,
    UserTypes,
} from '@msp-register/services/msp-register-state.service';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
import { validFormControl } from '@msp-register/models/validator-helpers';
import {
    IMspGroupDef,
    IUserDef,
    IAccessAdministratorDef,
} from '@core/interfaces/i-http-data';
import {
    IMspGroup,
    IMspSigningAuthority,
    IMspOrganization,
} from '@msp-register/interfaces';
import { IMspUser } from '@msp-register/interfaces/i-msp-user';
import { IMspAccessAdmin } from '@msp-register/interfaces/i-msp-access-admins';
import { Router } from '@angular/router';
import { MspRegisterApiService } from '@shared/services/api.service';
import { LoggerService, LogMessage } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import {
    funcRemoveStrings,
    funcRandomNumber8Digit,
} from '@msp-register/constants';
import { MspRegistrationService } from '@msp-register/msp-registration.service';
// import {  } from 'moh-common-lib/captcha';

export type AccessType = 'admin' | 'user';

@Component({
    selector: 'sitereg-msp-register-authorize',
    templateUrl: './msp-register-authorize.component.html',
    styleUrls: ['./msp-register-authorize.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MspRegisterAuthorizeComponent implements OnInit {
    fg: FormGroup;
    requestUUID: string;
    date: Date = new Date();
    adminFgs: FormGroup[];
    userFgs: FormGroup[];
    validFormControl: () => boolean;
    groupsMSP: IMspGroup[] = this.getGroupsInfo();

    // signingAuthority : IMspSigningAuthority;
    groupNumbers: IMspGroup[];

    captchaApiBaseUrl: string;
    nonce: string;
    showCaptcha = false;
    validCaptch = false;
    isProcessing = false;

    public get signingAuthority(): IMspSigningAuthority {
        return this.mspRegisterStateSvc.signingAuthority;
    }

    public get organization(): IMspOrganization {
        return this.mspRegisterStateSvc.organization;
    }

    constructor(
        private router: Router,
        public loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService,
        private formBuilder: FormBuilder,
        public mspRegisterStateSvc: MspRegisterStateService,
        public mspRegDataSvc: MspRegisterDataService,
        public mspRegApiSvc: MspRegisterApiService,
        public apiSvc: MspRegisterApiService,
        private registrationService: MspRegistrationService
    ) {
        this.validFormControl = validFormControl.bind(this);

        this.captchaApiBaseUrl = this.globalConfigSvc.currentEnironment.captchaApiBaseUrl;

        this.requestUUID = this.nonce = this.globalConfigSvc.applicationId;
        // this.nonce = GlobalConfigService.uuid;
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

        this.fg = this.mspRegisterStateSvc.mspRegisterAuthorizeForm;
        this.mspRegDataSvc.updateSigningAuthorityName(name);
        this.adminFgs = this.mspRegisterStateSvc.mspRegisterAccessAdminsForm;
        this.userFgs = this.mspRegisterStateSvc.mspRegisterUsersForm;

        this.genConsentForm();
    }

    continue() {

        this.isProcessing = true;
        // splunk-log
        this.loggerSvc.logNavigation(
            this.constructor.name,
            'Valid Data - Continue button clicked.'
        );

        this.registrationService.setItemComplete();

        // REMOVEME debug-only
        // this.debugOnly();

        const middleWareObject = this.registerationObject();

        console.log(
            `%c middleware object <= %o\n\t%o`,
            'color:lightgreen',
            funcRemoveStrings(
                ['MspRegister', 'Component'],
                this.constructor.name
            ),
            middleWareObject
        );

        // this.copyJsonSchema(middleWareObject);

        this.mspRegDataSvc.requestFinalStatus = null;
        const requestStatus = {
            referenceId : null,
            status: false,
            confirmationNumber: null,
            schema: middleWareObject,
            response: null,
            exception: null
        };

        this.mspRegApiSvc
            .siteRegisterationRequest(
                middleWareObject,
                this.date.toDateString()
            )
            .toPromise()
            .catch((err) => {
                this.loggerSvc.logError({
                    event: 'http-exception',
                    exceptionMessage: `${err}`,
                } as LogMessage);
                this.loggerSvc.logHttpError(err);
                requestStatus.exception = err;

                this.isProcessing = false;
            })
            .then((result) => {
                this.loggerSvc.logNavigation(
                    'middleware-request-status:',
                    'completed'
                );
                requestStatus.status = true;
                requestStatus.response = result;
                requestStatus.referenceId = this.requestUUID;

                if (result && requestStatus.exception === null) {
                        if (requestStatus.response.op_return_code && requestStatus.response.op_return_code === 'SUCCESS') {
                            requestStatus.confirmationNumber = requestStatus.response.op_reference_number;
                        } else {
                            requestStatus.status = false;
                        }
                }

                this.mspRegDataSvc.requestFinalStatus = requestStatus;

                this.isProcessing = false;
                this.registrationService.enableConfirmation = true;
                this.router.navigate(['msp-registration/confirmation']);
            });
    }

    private genConsentForm() {
        this.fg = this.formBuilder.group({
            consent: [false, [Validators.required]],
        });

        // temporary - if user click on disagree, this invalids required field
        this.fg.valueChanges.subscribe((data) => {
            const consentState = this.fg.get('consent');
            this.validCaptch = false;
            this.showCaptcha = false;

            if (consentState.value === false) {
                this.fg.setErrors({ consentFailed: true });
                this.showCaptcha = false;
                // this.fg.updateValueAndValidity();
            } else {
                this.showCaptcha = true;

                // REMOVEME - debug only - LOCAL-ONLY
                // this.continue();
                // this.debugOnly();
            }
        });
    }

    updateAccess($event: string, i: number, type: UserTypes) {
        switch (type) {
            case 'admin':
                return console.log(i, $event);
            case 'user':
                return console.log(i, $event);
        }
    }

    private copyJsonSchema(schema: any) {
        if (!this.globalConfigSvc.isProduction) {
            document.addEventListener('copy', (e: ClipboardEvent) => {
                e.clipboardData.setData('text/plain', JSON.stringify(schema));
                e.preventDefault();
                document.removeEventListener('copy', null);
            });
            document.execCommand('copy');
        }
    }

    getGroupsInfo() {
        // Msp Groups
        const mspGroups: IMspGroup[] = [];
        this.mspRegisterStateSvc.mspRegisterGroupForm.forEach((v) =>
            v.value ? mspGroups.push(v.value) : ''
        );
        return mspGroups;
    }

    registerationObject() {
        // Request Numer
        const requestNumber = funcRandomNumber8Digit();

        // Orgnaization Info
        const moOrganizationInformation = this.mspRegDataSvc.mapOrgInformation(
            this.mspRegisterStateSvc.mspRegisterOrganizationForm.value
        );

        // Signing Authority
        const moSigningAuthority = this.mspRegDataSvc.mapObjectSigningAuthorityInformationDef(
            this.mspRegisterStateSvc.mspRegisterSigningAuthorityForm.value
        );

        // Access Administrators
        const accessAdmins: IMspAccessAdmin[] = [];
        this.mspRegisterStateSvc.mspRegisterAccessAdminsForm.forEach((v) =>
            v.value ? accessAdmins.push(v.value) : ''
        );

        const moAccessAdministrators = this.mspRegDataSvc.mapAccessAdministratorDef(
            accessAdmins
        );

        // Users
        const mspUsers: IMspUser[] = [];
        this.mspRegisterStateSvc.mspRegisterUsersForm.forEach((v) =>
            v.value ? mspUsers.push(v.value) : ''
        );

        const moUsers = this.mspRegDataSvc.mapUserDef(mspUsers);

        // Msp Groups
        const mspGroups: IMspGroup[] = [];
        this.mspRegisterStateSvc.mspRegisterGroupForm.forEach((v) =>
            v.value ? mspGroups.push(v.value) : ''
        );
        this.groupsMSP = mspGroups;
        const isThirdPartyManamentAllowed = this.mspRegDataSvc.isThirdyPartyManagmentEnabled(
            moOrganizationInformation
        );

        const moMspGroups = this.mspRegDataSvc.mapGroupDef(
            mspGroups,
            isThirdPartyManamentAllowed
        );

        // Authorize
        const regRequest = this.mspRegDataSvc.mapSiteRegRequest(
            this.requestUUID,
            requestNumber,
            // this.validCaptch
            true, // REMOVEME - debug only - sending authorize by SA as true,
            this.date,
            moOrganizationInformation,
            moSigningAuthority,
            moAccessAdministrators as IAccessAdministratorDef[],
            moUsers as IUserDef[],
            moMspGroups as IMspGroupDef[],
            false
        );

        return regRequest;
    }

    isValidGroups() {
        return (
            this.groupsMSP.length > 0 &&
            ((this.groupsMSP[0].groupNumber as string) &&
                (this.groupsMSP[0].groupNumber as string).length > 3
                ? true
                : false)
        );
    }

    public get isWebEnabled() {
        if (
            this.mspRegisterStateSvc.mspRegisterAccessAdminsForm &&
            this.mspRegisterStateSvc.mspRegisterAccessAdminsForm.length === 0 &&
            (this.mspRegisterStateSvc.mspRegisterUsersForm &&
                this.mspRegisterStateSvc.mspRegisterUsersForm.length === 0)
        ) {
            return false;
        } else {
            return true;
        }
    }

    public navigateTo(route: string) {
        // this.router.navigate([`msp-registration/${route}`]);
    }

    setToken(token): void {
        // REMOVEME - debug only
        console.log(token);
        // this.debugOnly();
        this.validCaptch = true;
        this.apiSvc.setCaptchaToken(token);
    }

    toggleConsent() {
        const val = this.fg.get('consent').value;
        this.fg.patchValue({
            consent: val && val === true ? false : true,
        });
    }

    debugOnly() {
        if (this.globalConfigSvc.currentEnironment.production === false) {
            // Request Numer
            const requestNumber = funcRandomNumber8Digit();

            // Orgnaization Info
            const moOrganizationInformation = this.mspRegDataSvc.mapOrgInformation(
                this.mspRegisterStateSvc.mspRegisterOrganizationForm.value
            );
            console.log('\tMO - Organization info:', moOrganizationInformation);

            // Signing Authority
            const moSigningAuthority = this.mspRegDataSvc.mapObjectSigningAuthorityInformationDef(
                this.mspRegisterStateSvc.mspRegisterSigningAuthorityForm.value
            );
            console.log('\tMO - Signing Authority:', moSigningAuthority);

            // Access Administrators
            const accessAdmins: IMspAccessAdmin[] = [];
            this.mspRegisterStateSvc.mspRegisterAccessAdminsForm.forEach((v) =>
                v.value ? accessAdmins.push(v.value) : ''
            );

            const moAccessAdministrators = this.mspRegDataSvc.mapAccessAdministratorDef(
                accessAdmins
            );
            console.log('\tMO - Access Admins:', moAccessAdministrators);

            // Users
            const mspUsers: IMspUser[] = [];
            this.mspRegisterStateSvc.mspRegisterUsersForm.forEach((v) =>
                v.value ? mspUsers.push(v.value) : ''
            );

            const moUsers = this.mspRegDataSvc.mapUserDef(mspUsers);
            console.log('\tMO - Users:', moUsers);

            // Msp Groups
            const mspGroups: IMspGroup[] = [];
            this.mspRegisterStateSvc.mspRegisterGroupForm.forEach((v) =>
                v.value ? mspGroups.push(v.value) : ''
            );
            this.groupsMSP = mspGroups;
            const isThirdPartyManamentAllowed = this.mspRegDataSvc.isThirdyPartyManagmentEnabled(
                moOrganizationInformation
            );

            const moMspGroups = this.mspRegDataSvc.mapGroupDef(
                mspGroups,
                isThirdPartyManamentAllowed
            );
            console.log('\tMO - Group:', moMspGroups);

            // Authorize
            const regRequest = this.mspRegDataSvc.mapSiteRegRequest(
                this.requestUUID,
                requestNumber,
                // this.validCaptch
                true, // REMOVEME - debug only - sending authorize by SA as true
                this.date,
                moOrganizationInformation,
                moSigningAuthority,
                moAccessAdministrators as IAccessAdministratorDef[],
                moUsers as IUserDef[],
                moMspGroups as IMspGroupDef[],
                moSigningAuthority.msp_access &&
                    moSigningAuthority.msp_access === 'Y'
                    ? true
                    : false
            );

            console.log(
                '\tMO - Site Registeration Request Object:',
                regRequest
            );
        }
    }
}
