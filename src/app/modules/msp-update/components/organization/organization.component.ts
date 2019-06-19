import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { funcRemoveStrings } from '@msp-register/constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { FormBuilder, Validators } from '@angular/forms';
import { UpdateStateService } from '../../services/update.state.service';

@Component({
    selector: 'sitereg-msp-update-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.sass'],
})
export class MspDirectUpdateOrganizationComponent implements OnInit {
    private isUpdate = false;
    get buttonLabel(): string {
        return this.isUpdate ? 'Continue' : 'Skip';
    }

    constructor(
        private router: Router,
        private progressService: MspDirectUpdateProgressService,
        private loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService,
        private fb: FormBuilder,
        public updateStateService: UpdateStateService,
    ) {
      this.updateStateService.forms.organizationForm = this.fb.group({
        hasOrgInfoUpdates: [null, Validators.required],
        // todo - create separate sub-form for fields in edit.
      }, {updateOn: 'blur'});
    }

    ngOnInit() {
        this.progressService.setItemIncomplete();
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
        this.router.navigate([ROUTES_UPDATE.SIGNING_AUTHORITY.fullpath]);
    }
}
