import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { Router } from '@angular/router';
import { validFormControl } from '@msp-register/models/validator-helpers';
// TODO: initialize componenet with an array of the formgroups and then use NGFor to dynamically render them and add them.
@Component({
  selector: 'sitereg-msp-register-group-numbers',
  templateUrl: './msp-register-group-numbers.component.html',
  styleUrls: ['./msp-register-group-numbers.component.scss']
})
export class MspRegisterGroupNumbersComponent implements OnInit {
  fgs: FormGroup[];
  validFormControl: () => boolean;

  constructor(
    public mspRegisterStateSvc: MspRegisterStateService,
    private router: Router
  ) {
    this.fgs = this.mspRegisterStateSvc.mspRegisterGroupNumbersForm;
    this.validFormControl = validFormControl.bind(this);
  }

  ngOnInit() {}
  continue() {
    console.log('continue clicked');
    this.router.navigate(['msp-registration/authorize']);
  }

  addGroupNumber() {
    this.mspRegisterStateSvc.addGroupNumber();
  }

  delete(i: number) {
    this.mspRegisterStateSvc.removeGroupNumber(i);
  }
}
