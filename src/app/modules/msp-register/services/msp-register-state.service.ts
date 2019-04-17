import { Injectable } from '@angular/core';
import { MspRegisterOrganization } from '@msp-register/models/msp-register-organization';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GenerateForm } from '@msp-register/models/generate-form';
import { BehaviorSubject } from 'rxjs';
import { MspRegisterAccessAdmins } from '@msp-register/models/msp-register-access-admins';
import { MspRegisterSigningAuthority } from '@msp-register/models/msp-register-signing-authority';
import { MspRegisterGroup } from '@msp-register/models/msp-register-group';
import { MspRegisterUsers } from '@msp-register/models/msp-register-users';
import { MspRegisterAuthorize } from '@msp-register/models/msp-register-authorize';
import {
    IMspSigningAuthority,
    IMspOrganization,
} from '@msp-register/interfaces';
// import { MspRegisterUserMsp } from '@msp-register/models/core/msp-register-user-msp';

export type UserTypes = 'admin' | 'user';
@Injectable({
    providedIn: 'root',
})
export class MspRegisterStateService {
    consolePrintForm = '';

    private fb = new FormBuilder();
    private gf = new GenerateForm(this.fb);
    public mspRegisterOrganizationForm: FormGroup;
    public mspRegisterSigningAuthorityForm: FormGroup;
    public mspRegisterUserMspForm: FormGroup;
    public mspRegisterAccessAdminsForm: FormGroup[] = [];
    public mspRegisterUsersForm: FormGroup[] = [];
    public mspRegisterGroupForm: FormGroup[] = [];
    public mspRegisterAuthorizeForm: FormGroup;

    constructor() {
        if (this.constructor.name === this.consolePrintForm) {
            console.log(`%c %o`, `color:darkgreen`, this.constructor.name);
        }

        const fb = this.fb;
        const gf = this.gf;

        this.mspRegisterOrganizationForm = this.createMspRegisterOrganizationForm(
            gf,
            fb
        );
        this.mspRegisterSigningAuthorityForm = this.createMspRegisterSigningAuthorityForm(
            gf,
            fb
        );

        this.mspRegisterAuthorizeForm = this.createMspRegisterAuthorizeForm(
            gf,
            fb
        );
    }

    //#region Common

    validFormGroup(fgs: FormGroup[]): boolean {
        let bool = true;
        fgs.forEach((fg) => {
            if (fg.invalid) return (bool = false);
        });
        // console.log(bool);
        return bool;
    }

    //#endregion

    //#region Organizatoin

    get organization() {
        return this.mspRegisterOrganizationForm.value as IMspOrganization;
    }

    createMspRegisterOrganizationForm(gf: GenerateForm<any>, fb: FormBuilder) {
        const mro = new MspRegisterOrganization(gf, fb);
        return this.fb.group(
            mro.genForms(mro.generateArr(mro.genKeys, mro.validators))
        );
    }

    //#endregion

    //#region Signing Authority

    get signingAuthority() {
        return this.mspRegisterSigningAuthorityForm
            .value as IMspSigningAuthority;
    }

    createMspRegisterSigningAuthorityForm(
        gf: GenerateForm<any>,
        fb: FormBuilder
    ) {
        const mrsa = new MspRegisterSigningAuthority(gf, fb);
        return this.fb.group(
            mrsa.genForms(mrsa.generateArr(mrsa.genKeys, mrsa.validators))
        );
    }

    //#endregion

    //#region AccessAdmins

    addAdmin() {

        const newAdmin = this.createMspRegisterAccessAdminsForm(this.gf, this.fb);
        if (this.mspRegisterAccessAdminsForm.length === 0) {
            this.mspRegisterAccessAdminsForm = [ newAdmin ];
            return newAdmin;
        }

        this.mspRegisterAccessAdminsForm.unshift( newAdmin );
        return newAdmin;
    }

    removeAdmin(i: number) {
        this.mspRegisterAccessAdminsForm.splice(i, 1);
    }

    createMspRegisterAccessAdminsForm(gf: GenerateForm<any>, fb: FormBuilder) {
        const mr = new MspRegisterAccessAdmins(gf, fb);

        // REMOVEME
        this.logFormAndValidators(gf, mr);

        return this.fb.group(
            mr.genForms(mr.generateArr(mr.genKeys, mr.validators))
        );
    }

    //#endregion

    //#region Users

    addUser() {
        if (this.mspRegisterUsersForm.length === 0) {
            this.mspRegisterUsersForm = [
                this.createMspRegisterUsersForm(this.gf, this.fb),
            ];
            return;
        }

        this.mspRegisterUsersForm.unshift(
            this.createMspRegisterUsersForm(this.gf, this.fb)
        );
    }

    removeUser(i: number) {
        this.mspRegisterUsersForm.splice(i, 1);
    }

    createMspRegisterUsersForm(gf: GenerateForm<any>, fb: FormBuilder) {
        const mr = new MspRegisterUsers(gf, fb);

        // REMOVEME
        this.logFormAndValidators(gf, mr);

        return this.fb.group(
            mr.genForms(mr.generateArr(mr.genKeys, mr.validators))
        );
    }

    //#endregion

    //#region MspGroup

    addGroup() {
        if (this.mspRegisterGroupForm.length === 0) {
            this.mspRegisterGroupForm = [
                this.createMspRegisterGroupNumbersForm(this.gf, this.fb),
            ];
            return;
        }

        this.mspRegisterGroupForm.unshift(
            this.createMspRegisterGroupNumbersForm(this.gf, this.fb)
        );
    }

    removeGroup(i: number) {
        this.mspRegisterGroupForm.splice(i, 1);
    }

    createMspRegisterGroupNumbersForm(gf: GenerateForm<any>, fb: FormBuilder) {
        const mr = new MspRegisterGroup(gf, fb);

        // REMOVEME
        this.logFormAndValidators(gf, mr);

        return this.fb.group(
            mr.genForms(mr.generateArr(mr.genKeys, mr.validators))
        );
    }

    //#endregion

    //#region Authorization

    authorizeUsersList(group: FormGroup[]) {
        const users = [];
        if (group.length < 1) return;
        for (const control of group) {
            if (!control) return;
            users.push(control.value);
        }
        return users;
    }

    createMspRegisterAuthorizeForm(gf: GenerateForm<any>, fb: FormBuilder) {
        const mra = new MspRegisterAuthorize(gf, fb);
        return this.fb.group(
            mra.genForms(mra.generateArr(mra.genKeys, mra.validators))
        );
    }

    //#endregion

    //#region RufCommits

    // REMOVEME
    logFormAndValidators(gf: any, mr: any) {
        // REMOVEME
        if (this.constructor.name === this.consolePrintForm) {
            {
                console.log(
                    `%c:  %o <= gf : createMspRegisterGroupNumbersForm`,
                    `color:lightgreen`,
                    gf
                );
                console.log(
                    `%c  %o <= mrgn: instance returned for reactive forms`,
                    `color:lightgreen`,
                    mr
                );
                console.log(
                    `%c  Users =>  VALIDATORS .. %o`,
                    `color:green`,
                    mr.validators ? mr.validators : 'NO VALIDATORS FOUND'
                );
            }
        }
    }

    //#endregion
}
