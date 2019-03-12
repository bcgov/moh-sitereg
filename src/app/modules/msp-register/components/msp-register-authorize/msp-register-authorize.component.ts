import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'sitereg-msp-register-authorize',
  templateUrl: './msp-register-authorize.component.html',
  styleUrls: ['./msp-register-authorize.component.scss']
})
export class MspRegisterAuthorizeComponent implements OnInit {
  fg: FormGroup;
  signingAuthorityName: Observable<string>;
  date: Date = new Date();
  adminFgs: FormGroup[];
  userFgs: FormGroup[];

  constructor(
    public mspRegisterStateSvc: MspRegisterStateService,
    public mspRegDataSvc: MspRegisterDataService,
  ) {

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
  continue() {
    console.log('continue clicked');
  }
  validToken($event) {
    console.log($event);
    if (!$event.ok) console.log('error');
  }
}
