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

    constructor(
        private router: Router,
        public loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService,
        private formBuilder: FormBuilder,
        public mspRegisterStateSvc: MspRegisterStateService,
        public mspRegDataSvc: MspRegisterDataService,
        public mspRegApiSvc: MspRegisterApiService,
        public apiSvc: MspRegisterApiService
    ) {
        this.validFormControl = validFormControl.bind(this);

        this.captchaApiBaseUrl = this.globalConfigSvc.currentEnironment.captchaApiBaseUrl;
        this.nonce = this.globalConfigSvc.applicationId;

        this.debugOnly();
    }

    public get signingAuthority(): IMspSigningAuthority {
        return this.mspRegisterStateSvc.signingAuthority;
    }

    public get organization(): IMspOrganization {
        return this.mspRegisterStateSvc.organization;
    }

    ngOnInit() {
        this.fg = this.mspRegisterStateSvc.mspRegisterAuthorizeForm;
        this.mspRegDataSvc.updateSigningAuthorityName(name);
        this.adminFgs = this.mspRegisterStateSvc.mspRegisterAccessAdminsForm;
        this.userFgs = this.mspRegisterStateSvc.mspRegisterUsersForm;

        this.genConsentForm();
    }

    private genConsentForm() {
        this.fg = this.formBuilder.group({
            consent: ['', [Validators.required]],
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
    continue() {
        this.loggerSvc.logNavigation(
            this.constructor.name,
            'valid data - continue clicked'
        );
        // this.debugOnly();
        const regRequest = this.registerationObject();
        this.copyJsonSchema(regRequest);

        console.log(regRequest);

        this.mspRegApiSvc
            .siteRegisterationRequest(regRequest, this.date.toDateString())
            .toPromise()
            .catch((err) => {
                this.loggerSvc.logError({
                    event: 'http-exception',
                    exceptionMessage: `${err}`,
                } as LogMessage);
                this.loggerSvc.logHttpError(err);
            })
            .then((result) => {
                this.loggerSvc.logNavigation(
                    'middleware-request-status:',
                    'completed'
                );
            });
    }

    private copyJsonSchema(schema: any) {
        // if (!this.globalConfigSvc.currentEnironment.production) {
        document.addEventListener('copy', (e: ClipboardEvent) => {
            e.clipboardData.setData('text/plain', schema);
            e.preventDefault();
            document.removeEventListener('copy', null);
        });
        document.execCommand('copy');
        // }
    }

    // validToken($event) {
    //     console.log($event);
    //     if (!$event.ok) console.log('error');
    // }

    getGroupsInfo() {
        // Msp Groups
        const mspGroups: IMspGroup[] = [];
        this.mspRegisterStateSvc.mspRegisterGroupForm.forEach((v) =>
            v.value ? mspGroups.push(v.value) : ''
        );
        return mspGroups;
    }

    registerationObject() {
        // Request Numer - todo - autgenerate
        const requestNumber = this.genRandomNumber();

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
        const moMspGroups = this.mspRegDataSvc.mapGroupDef(mspGroups);

        // Authorize
        const regRequest = this.mspRegDataSvc.mapSiteRegRequest(
            requestNumber,
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

    genRandomNumber() {
        return Math.floor(Math.random() * 89999999 + 10000000).toString();
    }

    debugOnly() {
        if (this.globalConfigSvc.currentEnironment.production === false) {
            // Request Numer
            const requestNumber = this.genRandomNumber();

            // Orgnaization Info
            const moOrganizationInformation = this.mspRegDataSvc.mapOrgInformation(
                this.mspRegisterStateSvc.mspRegisterOrganizationForm.value
            );
            console.log('MO - Organization info:', moOrganizationInformation);

            // Signing Authority
            const moSigningAuthority = this.mspRegDataSvc.mapObjectSigningAuthorityInformationDef(
                this.mspRegisterStateSvc.mspRegisterSigningAuthorityForm.value
            );
            console.log('MO - Signing Authority:', moSigningAuthority);

            // Access Administrators
            const accessAdmins: IMspAccessAdmin[] = [];
            this.mspRegisterStateSvc.mspRegisterAccessAdminsForm.forEach((v) =>
                v.value ? accessAdmins.push(v.value) : ''
            );

            const moAccessAdministrators = this.mspRegDataSvc.mapAccessAdministratorDef(
                accessAdmins
            );
            console.log('MO - Access Admins:', moAccessAdministrators);

            // Users
            const mspUsers: IMspUser[] = [];
            this.mspRegisterStateSvc.mspRegisterUsersForm.forEach((v) =>
                v.value ? mspUsers.push(v.value) : ''
            );

            const moUsers = this.mspRegDataSvc.mapUserDef(mspUsers);
            console.log('MO - Users:', moUsers);

            // Msp Groups
            const mspGroups: IMspGroup[] = [];
            this.mspRegisterStateSvc.mspRegisterGroupForm.forEach((v) =>
                v.value ? mspGroups.push(v.value) : ''
            );
            this.groupsMSP = mspGroups;
            const moMspGroups = this.mspRegDataSvc.mapGroupDef(mspGroups);
            console.log('MO - Group:', moMspGroups);

            // Authorize
            const regRequest = this.mspRegDataSvc.mapSiteRegRequest(
                requestNumber,
                moOrganizationInformation,
                moSigningAuthority,
                moAccessAdministrators as IAccessAdministratorDef[],
                moUsers as IUserDef[],
                moMspGroups as IMspGroupDef[],
                false
            );

            console.log('MO - Site Registeration Request Object:', regRequest);
        }
    }

    setToken(token): void {
        // REMOVEME - debug only
        console.log(token);
        this.debugOnly();
        this.validCaptch = true;
        this.apiSvc.setCaptchaToken(token);
    }
}
