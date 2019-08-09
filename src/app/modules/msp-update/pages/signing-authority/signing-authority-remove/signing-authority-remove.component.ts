import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { cUpdateSigningAuthorityValidator } from '../shared/signing-authority-shared';

import {
    validMultiFormControl,
    formControlValidity,
} from '../../../common/update-validators';

import { getRemoveJsonOfSigningAuthority } from '../shared/signing-authority-json-map';
import { environment } from 'src/environments/environment.prod';
import { RandomObjects, IDataForm } from '../../../common/i-dataform';

@Component({
    selector: 'sitereg-update-signing-authority-remove',
    templateUrl: './signing-authority-remove.component.html',
    styleUrls: ['./signing-authority-remove.component.scss'],
})
export class MspDirectUpdateSigningAuthorityRemoveComponent
    implements OnInit, IDataForm {
    private arrayFormPropertyName = 'arrayOfForms';
    @Input() formState: FormGroup | null;
    @Output() formArrayChanged: EventEmitter<
        FormGroup | FormArray | null
    > = new EventEmitter<FormGroup | null>();
    parentForm: FormGroup;
    validFormControl: (fg: FormGroup, name: string) => boolean;
    formControlValidity: (
        fg: FormGroup,
        name: string
    ) => { required: boolean; other: boolean };
    json: (formValues: any) => any;

    constructor(private fb: FormBuilder) {
        this.validFormControl = validMultiFormControl;
        this.formControlValidity = formControlValidity;
        this.json = getRemoveJsonOfSigningAuthority;
    }

    ngOnInit() {
        this.createOrUpdateForms();
    }

    private createOrUpdateForms() {
        if (!this.formState) {
            // console.log('create or update form');
            this.parentForm = this.fb.group({
                arrayOfForms: this.fb.array([]),
            });
        } else {
            this.parentForm = this.formState;
        }
    }

    private createArrayForm() {
        const form = this.fb.group({
            emailAddress: [
                null,
                cUpdateSigningAuthorityValidator.remove.emailAddress,
            ],
            ministryUserId: [
                null,
                cUpdateSigningAuthorityValidator.remove.ministryUserId,
            ],
        });
        this.patchValue(form);
        return form;
    }

    private removeForm(index: number) {
        // console.log('Deleteing Form at ' + index);
        this.getFormsArray.removeAt(index);
        this.formArrayChanged.emit(this.parentForm);
    }

    get getFormsArray(): FormArray | null {
        return this.parentForm.get(
            this.arrayFormPropertyName
        ) as FormArray | null;
    }

    get getFormsCount(): number {
        return this.getFormsArray ? this.getFormsArray.controls.length : 0;
    }

    public newForm() {
        // console.log('Adding new Form');
        this.getFormsArray.insert(0, this.createArrayForm());
        this.formArrayChanged.emit(this.parentForm);
    }

    patchValue(formGroup) {
        if (!environment.useDummyData) return;
        formGroup.patchValue(
            RandomObjects.getRemoveUser(
                (this.getFormsCount + 1).toString() + 'SA'
            )
        );
    }
}
