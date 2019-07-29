import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators } from '@angular/forms';

import { cUpdateValidators, validMultiFormControl, isValidOptionalField } from '../../../common/validators';
import { getRemoveJsonOfMspGroup } from '../shared/group-shared-json-map';
import { environment } from 'src/environments/environment.prod';
import { IDataForm, RandomObjects } from '../../../common/i-dataform';


@Component({
  selector: 'sitereg-update-group-remove',
  templateUrl: './group-remove.component.html',
  styleUrls: ['./group-remove.component.scss']
})
export class MspDirectUpdateGroupRemoveComponent implements OnInit, IDataForm {


  private arrayFormPropertyName = 'arrayOfForms';
  @Input() formState: FormGroup | null;
  @Output() formArrayChanged: EventEmitter<FormGroup | FormArray | null> = new EventEmitter<FormGroup | null>();
  parentForm: FormGroup;
  validFormControl: (fg: FormGroup, name: string) => boolean;
  json: (formValues: any) => any;

  constructor(private fb: FormBuilder) {
    this.validFormControl = validMultiFormControl;
    this.json = getRemoveJsonOfMspGroup;
  }

  ngOnInit() {
    this.createOrUpdateForms();
  }

  private createOrUpdateForms() {
    if (!this.formState) {
      // console.log('create or update form');
      this.parentForm = this.fb.group({
        arrayOfForms: this.fb.array([])
      });
    } else {
      this.parentForm = this.formState;
    }
  }

  private createArrayForm() {
    const form = this.fb.group({
      groupNo: ['',  cUpdateValidators.group.groupNo]
    });
    this.patchValue(form);
    return form;
  }

  private removeForm(index: number) {
    this.getFormsArray.removeAt(index);
    this.formArrayChanged.emit(this.parentForm);
  }


  get getFormsArray(): FormArray | null {
    return this.parentForm.get(this.arrayFormPropertyName) as FormArray | null;
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
    console.log(`patchvalue REMOVE organization Form: %o`, RandomObjects.getGroup((this.getFormsCount + 1).toString()));
    formGroup.patchValue(RandomObjects.getGroup((this.getFormsCount + 1).toString()));
  }

}
