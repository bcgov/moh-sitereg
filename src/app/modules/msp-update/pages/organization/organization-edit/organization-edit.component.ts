import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { cUpdateEnumeration, validMultiFormControl, cUpdateValidators } from '../../../common/validators';
import { mapAdministeringForDef } from '../../../common/update-validators';

@Component({
  selector: 'sitereg-update-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.scss']
})
export class MspDirectUpdateOrganizationEditComponent implements OnInit {

  @Input() formState: FormGroup | null;
  parentForm: FormGroup;
  validFormControl: (fg: FormGroup, name: string) => boolean;
  administeringForOptions = cUpdateEnumeration.administeringFor.edit;
  @Output() statusChanged: EventEmitter<FormGroup | null> = new EventEmitter<FormGroup | null>();

  constructor(private fb: FormBuilder) {
    this.validFormControl = validMultiFormControl;
  }

  ngOnInit() {
    this.createOrUpdateForms();
    this.parentForm.valueChanges.subscribe(x => {
      this.statusChanged.emit(this.parentForm);

      // console.log(x);
      // console.log(this.parentForm);
      for (const controlName in this.parentForm.controls) {
        if (controlName) {
          const control = this.parentForm.get(controlName);
          if (control && control.status === 'INVALID') console.log(controlName + ' invalid');
        }
      }
    });
  }

  private createOrUpdateForms() {
    if (!this.formState) {
      console.log('create form');
      this.parentForm = this.createForm();
    } else {
      console.log('update form with state provided');
      this.parentForm = this.formState;
    }
    this.statusChanged.emit(this.parentForm);
  }

  private createForm() {
    return this.fb.group({
      organizationName: [null, cUpdateValidators.organization.organizationName],
      suite: [null, cUpdateValidators.organization.suite],
      street: [null, cUpdateValidators.organization.street],
      streetName: [null, cUpdateValidators.organization.streetName],
      addressLine2: [null, cUpdateValidators.organization.addressLine2],
      city: [null, cUpdateValidators.organization.city],
      province: [null, cUpdateValidators.organization.province],
      postalCode: [null, cUpdateValidators.organization.postalCode],
      administeringFor: [this.administeringForOptions[0], cUpdateValidators.organization.administeringFor]
    });
  }

  generateJSON(formValues) {
    // generate signing-authorityistrator-remove object
    // #suiteno is missing
    const json: any = {};
    json.org_name = formValues.organizationName ? formValues.organizationName : '';
    // suite no not in schema
    // json.suite = formValues.suite ? formValues.suite : '';
    // street no not in schema
    // json.street = formValues.street ? formValues.street : '';
    // is street_address is street name
    json.street_address = formValues.streetName ? formValues.streetName : '';
    json.address_2 = formValues.addressLine2 ? formValues.addressLine2 : '';
    json.city = formValues.city ? formValues.city : '';
    json.province = formValues.province ? formValues.province : '';
    json.postalCode = formValues.postalCode ? formValues.postalCode : '';
    json.org_spg = mapAdministeringForDef(formValues.administeringFor);
    // if (isValidOptionalField(formValues.ministryUserId)) json.user_id = formValues.ministryUserId;
    return json;
  }
}
