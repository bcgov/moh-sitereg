import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { validFormControl } from '@msp-register/models/validator-helpers';
import { cAdministeringFor, cAdministeringForUpdate } from '@msp-register/models/core/core-types';

@Component({
  selector: 'sitereg-organization-form',
  templateUrl: './organization-form.component.html',
  styleUrls: ['./organization-form.component.scss']
})
export class OrganizationFormComponent implements OnInit {
  @Input() fg: FormGroup;
  // TODO - Remove if not used. Currently not in use because fg is an object (pass by reference)
  // @Output() fgChange: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

  /**
   * Tweak certain behaviours for each of the MSP Direct apps.
   */
  @Input() mode: 'register' | 'update' = 'update';

  validFormControl = validFormControl;

  /**
   * List of all dropdown options for 'Administering For' - this varies
   * depending on `this.mode`
   */
  administeringForOptions: string[];


  constructor() { }

  ngOnInit() {
    this.administeringForOptions = this.isUpdate() ? cAdministeringForUpdate : cAdministeringFor;
  }

  isUpdate(): boolean {
    return this.mode === 'update';
  }

  isRegister(): boolean {
    return !this.isUpdate();
  }


}
