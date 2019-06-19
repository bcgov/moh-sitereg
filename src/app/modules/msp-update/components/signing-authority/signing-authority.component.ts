import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { funcRemoveStrings } from '@msp-register/constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UpdateStateService } from '../../services/update.state.service';

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
      this.updateStateService.forms.signingAuthority = this.fb.group({
        // userTitle?: ctFormControlUserTitle = null;
        // firstName: ctFormControlString = null;
        // initial?: ctFormControlString = null;
        // lastName: ctFormControlString = null;
        // jobTitle: ctFormControlString = null;
        // emailAddress: ctFormControlString = null;
        // confirmEmail: ctFormControlString = null;
        // phone: ctFormControlString = null;
        // ext?: ctFormControlString = null;
        // fax: ctFormControlString = null;
        // administeringFor: ctFormControlString = null;
        // directMspAccess: ctFormControlBoolean = null;
        userTitle: [null],
        firstName: [null],
        initial: [null],
        lastName: [null],
        jobTitle: [null],
        emailAddress: [null],
        confirmEmail: [null],
        phone: [null],
        ext: [null],
        fax: [null],
        administeringFor: [null],
        directMspAccess: [null],

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
