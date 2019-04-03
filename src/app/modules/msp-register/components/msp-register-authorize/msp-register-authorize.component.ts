import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import {
    MspRegisterStateService,
    UserTypes,
} from '@msp-register/services/msp-register-state.service';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
import { Observable } from 'rxjs';
import { validFormControl } from '@msp-register/models/validator-helpers';
import {
    IMspGroupDef,
    IUserDef,
    IAccessAdministratorDef,
} from '@core/interfaces/i-http-data';
import { IMspGroup } from '@msp-register/interfaces';
import { IMspUser } from '@msp-register/interfaces/i-msp-user';
import { IMspAccessAdmin } from '@msp-register/interfaces/i-msp-access-admins';
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
    signingAuthorityName: Observable<string>;
    date: Date = new Date();
    adminFgs: FormGroup[];
    userFgs: FormGroup[];
    validFormControl: () => boolean;
    groupsMSP: IMspGroup[] = this.getGroupsInfo();

    constructor(
        public mspRegisterStateSvc: MspRegisterStateService,
        public mspRegDataSvc: MspRegisterDataService
    ) {
        this.validFormControl = validFormControl.bind(this);
    }

    ngOnInit() {
        this.fg = this.mspRegisterStateSvc.mspRegisterAuthorizeForm;
        const name = this.mspRegisterStateSvc.signingAuthorityName;
        this.mspRegDataSvc.updateSigningAuthorityName(name);
        const address = this.mspRegisterStateSvc.signingAuthorityAddress;
        this.mspRegDataSvc.updateSigningAuthorityAddress(address);
        this.adminFgs = this.mspRegisterStateSvc.mspRegisterAccessAdminsForm;
        this.userFgs = this.mspRegisterStateSvc.mspRegisterUsersForm;
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
        console.clear();
        const regRequest = this.registerationObject();

        this.mspRegDataSvc.createSiteregRequest(regRequest).catch((e) => {
            console.log(e);
        });
    }

    validToken($event) {
        console.log($event);
        if (!$event.ok) console.log('error');
    }

    getGroupsInfo() {

        // Msp Groups
        const mspGroups: IMspGroup[] = [];
        this.mspRegisterStateSvc.mspRegisterGroupForm.forEach((v) =>
            v.value ? mspGroups.push(v.value) : ''
        );
        return  mspGroups;
    }

    registerationObject() {
        // Request Numer
        const requestNumber = '12345678';

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
        return regRequest;
    }

    isValidGroups() {
        return (    this.groupsMSP.length > 0
            && (
                ((this.groupsMSP[0].groupNumber as string) &&
                (this.groupsMSP[0].groupNumber as string).length > 3 ) ? true : false ));
    }
}
