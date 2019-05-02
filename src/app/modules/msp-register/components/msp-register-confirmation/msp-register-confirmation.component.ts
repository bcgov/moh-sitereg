import { Component, OnInit } from '@angular/core';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'sitereg-msp-register-confirmation',
  templateUrl: './msp-register-confirmation.component.html',
  styleUrls: ['./msp-register-confirmation.component.scss']
})
export class MspRegisterConfirmationComponent implements OnInit {

  status = false;
  showDetail = false;
  isTechnicalInfoAvaialble = false;
  constructor(
    private router: Router,
    public mspRegDataSvc: MspRegisterDataService) { }

  ngOnInit() {
    this.status =
      (this.mspRegDataSvc.requestFinalStatus && this.mspRegDataSvc.requestFinalStatus.status) ?
        this.mspRegDataSvc.requestFinalStatus.status : false;
    this.isTechnicalInfoAvaialble = this.mspRegDataSvc.requestFinalStatus ? true : false;
  }

  toggleDetail() {
    this.showDetail = !this.showDetail;
  }

  redirect() {
    this.router.navigate(['msp-registration/organization']);
  }

}
