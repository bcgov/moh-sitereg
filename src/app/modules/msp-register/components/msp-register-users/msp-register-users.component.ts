import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'sitereg-msp-register-users',
  templateUrl: './msp-register-users.component.html',
  styleUrls: ['./msp-register-users.component.scss']
})
export class MspRegisterUsersComponent implements OnInit {
  fgs: FormGroup[];
  administeringFor: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([
    'me',
    'you'
  ]);
  validateFormGroup = this.mspRegisterStateSvc.validFormGroup;

  constructor(
    public mspRegisterStateSvc: MspRegisterStateService,
    private router: Router
  ) {
    this.fgs = this.mspRegisterStateSvc.mspRegisterUsersForm;
  }

  ngOnInit() {}

  continue() {
    this.router.navigate(['msp-registration/group-numbers']);
  }

  addUser() {
    this.mspRegisterStateSvc.addUser();
  }

  delete(i: number) {
    this.mspRegisterStateSvc.removeUser(i);
  }
}
