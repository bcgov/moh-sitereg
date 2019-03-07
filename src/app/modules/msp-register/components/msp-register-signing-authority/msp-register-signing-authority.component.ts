import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';

@Component({
  selector: 'sitereg-msp-register-signing-authority',
  templateUrl: './msp-register-signing-authority.component.html',
  styleUrls: ['./msp-register-signing-authority.component.scss']
})
export class MspRegisterSigningAuthorityComponent implements OnInit {
  fg: FormGroup;

  constructor(
    private router: Router,
    private mspRegisterStateSvc: MspRegisterStateService,
  ) {
    this.fg = this.mspRegisterStateSvc.mspRegisterSigningAuthorityForm;
  }

  ngOnInit() {
  }
  continue() {
    this.router.navigate(['msp-register/signing-authority']);
    console.log('navigates');
  }
}
