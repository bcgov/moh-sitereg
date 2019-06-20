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
import { validMultiFormControl } from '@msp-register/models/validator-helpers';

@Component({
    selector: 'sitereg-msp-update-signing-authority',
    templateUrl: './signing-authority.component.html',
    styleUrls: ['./signing-authority.component.sass'],
})
export class MspDirectUpdateSigningAuthorityComponent implements OnInit {
    validFormControl: (fg: FormGroup, name: string) => boolean;

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

      this.validFormControl = validMultiFormControl;

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

    // We have to use getters here, as values change to null which means the
    // reference is broken.
    get addFg(): FormGroup {
      return this.updateStateService.forms.signingAuthority.add;
    }

    get removeFg(): FormGroup {
      return this.updateStateService.forms.signingAuthority.remove;
    }

    get updateFg(): FormGroup {
      return this.updateStateService.forms.signingAuthority.update;
    }

    addSigningAuthority() {
      this.showAddSigningAuthority = true;
      this.updateStateService.forms.signingAuthority.add = this.fb.group({
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
      }, {updateOn: 'blur'});
    }

    removeSigningAuthority() {
      this.showRemoveSigningAuthority = true;
      this.updateStateService.forms.signingAuthority.remove = this.fb.group({
        removeSAEmail: [null, cUserValidators.emailAddress],
        removeSAUserID: [null] // TODO - Validators
      }, {updateOn: 'blur'});
    }

    // TODO - Verify validation logic here, it may differ between this and add.
    updateSigningAuthority() {
      this.showUpdateSigningAuthority = true;
      this.updateStateService.forms.signingAuthority.update = this.fb.group({
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
        updateSAEmail: [null, cUserValidators.emailAddress],
        // TODO - Verify below is not necesary. Think it's for reg only.
        // directMspAccess: [null, cUserValidators.directMspAccess],
      }, {updateOn: 'blur'});
    }



    cancelAddSigningAuthority() {
      this.showAddSigningAuthority = false;
      this.updateStateService.forms.signingAuthority.add = null;
    }

    cancelRemoveSigningAuthority() {
      this.showRemoveSigningAuthority = false;
      this.updateStateService.forms.signingAuthority.remove = null;
    }

    cancelUpdateSigningAuthority() {
      this.showUpdateSigningAuthority = false;
      this.updateStateService.forms.signingAuthority.update = null;
    }

    private get isUpdate(): boolean {
      return !(this.showAddSigningAuthority === false &&
        this.showRemoveSigningAuthority === false &&
        this.showUpdateSigningAuthority === false);
    }

    canContinue(){
      return [this.addFg, this.removeFg, this.updateFg]
        .filter(x => x !== null && x !== undefined) // only check added form
        .map(x => x.valid) // get validity
        .filter(x => x === false) // get invalid forms
        .length === 0;
    }
}
