import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { funcRemoveStrings } from '@msp-register/constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { FormBuilder } from '@angular/forms';
import { UpdateStateService } from '../../services/update.state.service';

@Component({
    selector: 'sitereg-msp-update-signing-authority',
    templateUrl: './signing-authority.component.html',
    styleUrls: ['./signing-authority.component.sass'],
})
export class MspDirectUpdateSigningAuthorityComponent implements OnInit {
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
