import { Injectable } from '@angular/core';
import { MspRegisterOrganization } from '@msp-register/models/msp-register-organization';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { GenerateForm } from '@msp-register/models/generate-form';
import { BehaviorSubject } from 'rxjs';
import { MspRegisterAccessAdmins } from '@msp-register/models/msp-register-access-admins';
import { MspRegisterSigningAuthority } from '@msp-register/models/msp-register-signing-authority';
import { MspRegisterGroupNumbers } from '@msp-register/models/msp-register-group-numbers';
import { MspRegisterUsers } from '@msp-register/models/msp-register-users';
import { MspRegisterAuthorize } from '@msp-register/models/msp-register-authorize';
// import { MspRegisterUserMsp } from '@msp-register/models/core/msp-register-user-msp';

export type UserTypes = 'admin' | 'user';
@Injectable({
    providedIn: 'root',
})
export class MspRegisterStateService {
    private fb = new FormBuilder();
    private gf = new GenerateForm(this.fb);
    public mspRegisterOrganizationForm: FormGroup;
    public mspRegisterAccessAdminsForm: FormGroup[];
    public mspRegisterSigningAuthorityForm: FormGroup;
    public mspRegisterUserMspForm: FormGroup;
    public mspRegisterGroupNumbersForm: FormGroup[];
    public mspRegisterUsersForm: FormGroup[];
    public mspRegisterAuthorizeForm: FormGroup;

    addAdmin() {
        this.mspRegisterAccessAdminsForm.unshift(
            this.createMspRegisterSigningAuthorityForm(this.gf, this.fb)
        );
    }

    removeAdmin(i: number) {
        this.mspRegisterAccessAdminsForm.splice(i, 1);
    }

    addUser() {
        this.mspRegisterUsersForm.unshift(
            this.createMspRegisterUsersForm(this.gf, this.fb)
        );
    }

    removeUser(i: number) {
        this.mspRegisterUsersForm.splice(i, 1);
    }

    addGroupNumber() {
        this.mspRegisterGroupNumbersForm.unshift(
            this.createMspRegisterGroupNumbersForm(this.gf, this.fb)
        );
    }

    removeGroupNumber(i: number) {
        this.mspRegisterGroupNumbersForm.splice(i, 1);
    }

    get signingAuthorityName() {
        const formVal = this.mspRegisterSigningAuthorityForm.value;
        return `${formVal.firstName} ${formVal.lastName} `;
    }

    get signingAuthorityAddress() {
        const formVal = this.mspRegisterOrganizationForm.value;
        return `${formVal.address} `;
    }

    authorizeUsersList(group: FormGroup[]) {
        const users = [];
        if (group.length < 1) return;
        for (const control of group) {
            if (!control) return;
            users.push(control.value);
        }
        return users;
    }

    validFormGroup(fgs: FormGroup[]): boolean {
        let bool = true;
        fgs.forEach((fg) => {
            if (fg.invalid) return (bool = false);
        });
        // console.log(bool);
        return bool;
    }

    constructor() {
        const fb = this.fb;
        const gf = this.gf;
        this.mspRegisterOrganizationForm = this.createMspRegisterOrganizationForm(
            gf,
            fb
        );
        this.mspRegisterAccessAdminsForm = [
            this.createMspRegisterAccessAdminsForm(gf, fb),
        ];
        this.mspRegisterSigningAuthorityForm = this.createMspRegisterSigningAuthorityForm(
            gf,
            fb
        );

        // this.mspRegisterUserMspForm = this.createMspRegisterUserMspFormReusable(
        //     gf,
        //     fb
        // );

        this.mspRegisterGroupNumbersForm = [
            this.createMspRegisterGroupNumbersForm(gf, fb),
        ];
        this.mspRegisterUsersForm = [this.createMspRegisterUsersForm(gf, fb)];
        this.mspRegisterAuthorizeForm = this.createMspRegisterAuthorizeForm(
            gf,
            fb
        );
        this.mspRegisterOrganizationForm.valueChanges.subscribe((obs) =>
            console.log(obs)
        );
    }

    createMspRegisterOrganizationForm(gf: GenerateForm<any>, fb: FormBuilder) {
        const mro = new MspRegisterOrganization(gf, fb);
        return this.fb.group(
            mro.genForms(mro.generateArr(mro.genKeys, mro.validators))
        );
    }

    createMspRegisterAccessAdminsForm(gf: GenerateForm<any>, fb: FormBuilder) {
        const mraa = new MspRegisterAccessAdmins(gf, fb);
        const form = this.fb.group(
            mraa.genForms(mraa.generateArr(mraa.genKeys, mraa.validators))
        );
        // for (const control in form.controls) {
        //   form.controls[control].setValue('zzzzz');
        // }
        return form;
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

    // createMspRegisterUserMspFormReusable(
    //     gf: GenerateForm<any>,
    //     fb: FormBuilder
    // ) {
    //     const mrsa = new MspRegisterUserMsp(gf, fb);
    //     return this.fb.group(
    //         mrsa.genForms(mrsa.generateArr(mrsa.genKeys, mrsa.validators))
    //     );
    // }

    createMspRegisterGroupNumbersForm(gf: GenerateForm<any>, fb: FormBuilder) {
        const mrgn = new MspRegisterGroupNumbers(gf, fb);
        return this.fb.group(
            mrgn.genForms(mrgn.generateArr(mrgn.genKeys, mrgn.validators))
        );
    }

    createMspRegisterUsersForm(gf: GenerateForm<any>, fb: FormBuilder) {
        const mru = new MspRegisterUsers(gf, fb);
        return this.fb.group(
            mru.genForms(mru.generateArr(mru.genKeys, mru.validators))
        );
    }

    createMspRegisterAuthorizeForm(gf: GenerateForm<any>, fb: FormBuilder) {
        const mra = new MspRegisterAuthorize(gf, fb);
        return this.fb.group(
            mra.genForms(mra.generateArr(mra.genKeys, mra.validators))
        );
    }
}
