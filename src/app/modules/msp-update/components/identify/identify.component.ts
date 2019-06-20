import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { UpdateStateService } from '../../services/update.state.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { validFormControlCommon, validFormControl, validMultiFormControl } from '@msp-register/models/validator-helpers';
import { cUserValidators, cUpdateValidators } from '@msp-register/models/core/core-types';

@Component({
    selector: 'sitereg-msp-update-identify',
    templateUrl: './identify.component.html',
    styleUrls: ['./identify.component.scss'],
})
export class MspDirectUpdateIdentifyComponent implements OnInit, AfterViewInit {
    @ViewChild('consentModal') consentModal;
    validFormControl: (fg: FormGroup, name: string) => boolean;
    fg: FormGroup;


    constructor(
        private router: Router,
        private progressService: MspDirectUpdateProgressService,
        private loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService,
        public updateStateService: UpdateStateService,
        private fb: FormBuilder
    ) {
      this.updateStateService.forms.profileForm = this.fb.group({
        organizationNumber: ['', cUpdateValidators.organizationNumber],
        emailAddress: ['', cUserValidators.emailAddress]
      }, {updateOn: 'blur'});
      this.validFormControl = validFormControlCommon;

      // Share the same reference, better than using a TS get().
      this.fg = this.updateStateService.forms.profileForm;
    }

    ngOnInit() {
        this.progressService.setItemIncomplete();
    }

    ngAfterViewInit() {
        if (!this.updateStateService.hasConsentedToInformationCollection) {
            this.consentModal.showFullSizeView();
        }
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
        this.router.navigate([ROUTES_UPDATE.ORGANIZATION.fullpath]);
    }


    onAcceptCollectionNotice(accepted: boolean) {
        this.updateStateService.hasConsentedToInformationCollection = accepted;
    }
}
