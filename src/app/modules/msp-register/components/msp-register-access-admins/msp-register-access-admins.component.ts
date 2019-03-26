import { Component, OnInit, ChangeDetectionStrategy } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { MspRegisterStateService } from "@msp-register/services/msp-register-state.service";
import { Router } from "@angular/router";
import {
  validFormControl,
  validMultiFormControl
} from "@msp-register/models/validator-helpers";

@Component({
  selector: "sitereg-msp-register-access-admins",
  templateUrl: "./msp-register-access-admins.component.html",
  styleUrls: ["./msp-register-access-admins.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MspRegisterAccessAdminsComponent implements OnInit {
  fgs: FormGroup[];
  validFormControl: () => boolean;
  get validForms() {
    if (!this.fgs) return false;
    return this.mspRegisterStateSvc.validFormGroup(this.fgs);
  }
  constructor(
    public mspRegisterStateSvc: MspRegisterStateService,
    private router: Router
  ) {
    this.fgs = this.mspRegisterStateSvc.mspRegisterAccessAdminsForm;
    this.validFormControl = validMultiFormControl.bind(this);
  }

  ngOnInit() {}

  continue() {
    this.router.navigate(["msp-registration/users"]);
  }

  addAdmin() {
    this.mspRegisterStateSvc.addAdmin();
  }

  delete(i: number) {
    this.mspRegisterStateSvc.removeAdmin(i);
  }
}
