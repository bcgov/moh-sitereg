import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { cUpdateAdministeringFor, validMultiFormControl, cUpdateValidators } from '../../../common/validators';

@Component({
  selector: 'sitereg-update-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.scss']
})
export class MspDirectUpdateOrganizationEditComponent implements OnInit {

  @Input() formState: FormGroup | null;
  parentForm: FormGroup;
  validFormControl: (fg: FormGroup, name: string) => boolean;
  administeringForOptions = cUpdateAdministeringFor;

  constructor(private fb: FormBuilder) {
    this.validFormControl = validMultiFormControl;
  }

  ngOnInit() {
    this.createOrUpdateForms();
  }

  private createOrUpdateForms() {
    if (!this.formState) {
      console.log('create form');
      this.parentForm = this.createForm();
    } else {
      console.log('update form with state provided');
      this.parentForm = this.formState;
    }
  }

  private createForm() {
    return this.fb.group({
      organizationName: [null, cUpdateValidators.organization.name],
      suite: [null, cUpdateValidators.organization.suite],
      street: [null, cUpdateValidators.organization.street],
      streetName: [null, cUpdateValidators.organization.streetName],
      addressLine2: [null, cUpdateValidators.organization.addressLine2],
      city: [null, cUpdateValidators.organization.city],
      province: [null, cUpdateValidators.organization.province],
      postalCode: [null, cUpdateValidators.organization.postalCode],
      administeringFor: [this.administeringForOptions[0], cUpdateValidators.organization.name]
    });
  }
}
