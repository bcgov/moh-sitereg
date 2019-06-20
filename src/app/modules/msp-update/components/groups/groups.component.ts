import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { funcRemoveStrings } from '@msp-register/constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UpdateStateService } from '../../services/update.state.service';

@Component({
    selector: 'sitereg-msp-update-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.sass'],
})
export class MspDirectUpdateGroupsComponent implements OnInit {

  fg: FormGroup;

  private updateInfo = false;

  constructor(
      private router: Router,
      private progressService: MspDirectUpdateProgressService,
      private loggerSvc: LoggerService,
      private globalConfigSvc: GlobalConfigService,
      public updateStateService: UpdateStateService,
      private fb: FormBuilder
  ) {

    //groupForm
  }

  ngOnInit() {
    this.progressService.setItemIncomplete();
  }

  get buttonLabel() {
    return this.updateInfo ? 'Continue' : 'Skip';
  }

  continue() {
      // splunk-log
      this.loggerSvc.logNavigation(
          this.constructor.name,
          `Valid Data - Continue button clicked. ${
              this.globalConfigSvc.applicationId
          }`
      );
      this.progressService.setItemComplete();
      this.router.navigate([ROUTES_UPDATE.SUBMIT.fullpath]);
  }

    // Button functions
    AddMspGroup() {
      console.log( 'Add Msp Group clicked' );
      this.updateInfo = true;
    }

    RemoveMspGroup() {
      console.log( 'Remove Msp Group clicked' );
      this.updateInfo = true;
    }

    UpdateMspGroupAdmin() {
      console.log( 'Update administration of Msp Group clicked' );
      this.updateInfo = true;
    }
}
