import { Component, OnInit } from '@angular/core';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';

@Component({
  selector: 'sitereg-msp-registration-complete',
  templateUrl: './msp-registration-complete.component.html',
  styleUrls: ['./msp-registration-complete.component.scss']
})
export class MspRegistrationCompleteComponent implements OnInit {

  status: boolean;
  finalresult: any;
  constructor(
    public mspRegDataSvc: MspRegisterDataService
  ) { }

  ngOnInit() {
    this.status = this.mspRegDataSvc.requestFinalStatus.status;
    this.finalresult = this.mspRegDataSvc.requestFinalStatus;
  }

}
