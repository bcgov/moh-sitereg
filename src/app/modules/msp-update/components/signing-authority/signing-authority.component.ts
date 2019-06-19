import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { funcRemoveStrings } from '@msp-register/constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpdateStateService } from '../../services/update.state.service';
import { cUserValidators } from '@msp-register/models/core/core-types';

@Component({
    selector: 'sitereg-msp-update-signing-authority',
    templateUrl: './signing-authority.component.html',
    styleUrls: ['./signing-authority.component.sass'],
})
export class MspDirectUpdateSigningAuthorityComponent implements OnInit {
    fg: FormGroup;
    private isUpdate = false;
    get buttonLabel(): string {
        return this.isUpdate ? 'Continue' : 'Skip';
    }

    public showAddSigningAuthority = false;
    public showRemoveSigningAuthority = false;
    public showUpdateSigningAuthority = false;


    constructor(
        private router: Router,
        private progressService: MspDirectUpdateProgressService,
        private loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService,
        public updateStateService: UpdateStateService,
        private fb: FormBuilder
    ) {

      // Related class: CoreUser

      // TODO - This is for add. How about other form types?
      // this.updateStateService.forms.signingAuthority = this.fb.group({
      //   userTitle: [null, cUserValidators.userTitle],
      //   firstName: [null, cUserValidators.firstName],
      //   initial: [null, cUserValidators.initial],
      //   lastName: [null, cUserValidators.lastName],
      //   jobTitle: [null, cUserValidators.jobTitle],
      //   emailAddress: [null, cUserValidators.emailAddress],
      //   confirmEmail: [null, cUserValidators.confirmEmail],
      //   phone: [null, cUserValidators.phone],
      //   ext: [null, cUserValidators.ext],
      //   fax: [null, cUserValidators.fax],
      //   administeringFor: [null, cUserValidators.administeringFor],
      //   // TODO - Verify below is not necesary. Think it's for reg only.
      //   // directMspAccess: [null, cUserValidators.directMspAccess],

      // }, {updateOn: 'blur'});

      // IDEA - Consider adding/removing from the formGroup as user adds/removes from the UI?
      this.updateStateService.forms.signingAuthority = this.fb.group({

        addSigningAuthority: this.fb.group({
          userTitle: [null, cUserValidators.userTitle],
          firstName: [null, cUserValidators.firstName],
          initial: [null, cUserValidators.initial],
          lastName: [null, cUserValidators.lastName],
          jobTitle: [null, cUserValidators.jobTitle],
          emailAddress: [null, cUserValidators.emailAddress],
          confirmEmail: [null, cUserValidators.confirmEmail],
          phone: [null, cUserValidators.phone],
          ext: [null, cUserValidators.ext],
          fax: [null, cUserValidators.fax],
          administeringFor: [null, cUserValidators.administeringFor],
          // TODO - Verify below is not necesary. Think it's for reg only.
          // directMspAccess: [null, cUserValidators.directMspAccess],
        }),

        removeSigningAuthority: this.fb.group({
          removeSAEmail: [null, cUserValidators.emailAddress],
          removeSAUserID: [null] // TODO - Validators
        }),

      }, {updateOn: 'blur'});


      this.fg = this.updateStateService.forms.signingAuthority;

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
        this.router.navigate([ROUTES_UPDATE.ACCESS_ADMINS.fullpath]);
    }

    addSigningAuthority() {
      this.showAddSigningAuthority = true;
    }

    removeSigningAuthority() {
      this.showRemoveSigningAuthority = true;
    }

    updateSigningAuthority() {
      this.showUpdateSigningAuthority = true;
    }



    cancelAddSigningAuthority() {
      this.showAddSigningAuthority = false;
    }

    cancelRemoveSigningAuthority() {
      this.showRemoveSigningAuthority = false;
    }

    cancelUpdateSigningAuthority() {
      this.showUpdateSigningAuthority = false;
    }
}
