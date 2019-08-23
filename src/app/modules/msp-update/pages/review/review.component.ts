import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UpdateStateService } from '../../services/update.state.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { ReviewItemInterface } from '../../components/review-section/review-section.component';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { funcRemoveStrings } from '@msp-register/constants';
import { jsonPayLoadApplication } from '../submit/json-payload';

@Component({
    selector: 'sitereg-msp-update-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss'],
})
export class MspUpdateReviewComponent implements OnInit {

  get componentInfo(): string {
    return (
      `${funcRemoveStrings(
        ['MspDirectUpdate', 'Component'],
        this.constructor.name
      ).toUpperCase()} :` + ` ${this.globalConfigSvc.applicationId}`
    );
  }

  constructor(
    private router: Router,
    private progressService: MspDirectUpdateProgressService,
    private loggerSvc: LoggerService,
    private globalConfigSvc: GlobalConfigService,
    public updateStateService: UpdateStateService
  ) {

  }

  ngOnInit() {
    // console.log(`%c%o : %o`, 'color:green', this.componentInfo);
    this.progressService.setPageIncomplete();
  }

  continue() {
    // splunk-log
    this.loggerSvc.logNavigation(
      this.constructor.name,
      `Valid Data - Continue button clicked. ${
      this.globalConfigSvc.applicationId
      }`
    );
    this.progressService.setPageComplete();
    this.router.navigate([ROUTES_UPDATE.SUBMIT.fullpath]);
  }

  // json() {
  //   this.updateStateService.applicationId = this.globalConfigSvc.applicationId;
  //   return jsonPayLoadApplication(this.updateStateService);
  // }

}
