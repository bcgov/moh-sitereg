import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { IUser } from '@msp-register/interfaces';
import { validFormControl } from '@msp-register/models/validator-helpers';

@Component({
  selector: 'sitereg-msp-register-signing-authority',
  templateUrl: './msp-register-signing-authority.component.html',
  styleUrls: ['./msp-register-signing-authority.component.scss']
})
export class MspRegisterSigningAuthorityComponent implements OnInit {
  fg: FormGroup;
  validFormControl: () => boolean;

  constructor(
    private router: Router,
    private mspRegisterStateSvc: MspRegisterStateService
  ) {
    this.fg = this.mspRegisterStateSvc.mspRegisterSigningAuthorityForm;
    this.validFormControl = validFormControl.bind(this);
  }

  ngOnInit() {}

  updateFormData(obj: IUser) {
    // tslint:disable-next-line: forin
    for (let key in obj) {
      if (!this.fg.controls[key]) return;
      this.fg.controls[key].setValue(obj[key]);
    }
  }

  continue() {
    this.router.navigate(['msp-registration/access-admins']);
  }
}
