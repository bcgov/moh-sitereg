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
    selector: 'sitereg-msp-update-access-administrator',
    templateUrl: './access-administrator.component.html',
    styleUrls: ['./access-administrator.component.scss'],
})
export class MspDirectUpdateAccessAdministratorComponent implements OnInit {

    validFormControl: (fg: FormGroup, name: string) => boolean;

    get buttonLabel(): string {
        return this.isUpdate ? 'Continue' : 'Skip';
    }

    public showAddAccessAdmin = false;
    public showRemoveAccessAdmin = false;
    public showUpdateAccessAdmin = false;

    private get isUpdate(): boolean {
        return !(this.showAddAccessAdmin === false &&
            this.showRemoveAccessAdmin === false &&
            this.showUpdateAccessAdmin === false);
    }

    canContinue() {
        return [this.addFg, this.removeFg, this.updateFg]
            .filter(x => x !== null && x !== undefined) // only check added form
            .map(x => x.valid) // get validity
            .filter(x => x === false) // get invalid forms
            .length === 0;
    }

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
        public updateStateService: UpdateStateService,
        private fb: FormBuilder
    ) { }

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
        this.router.navigate([ROUTES_UPDATE.USERS.fullpath]);
    }

    get addFg(): FormGroup {
        return this.updateStateService.forms.mspAccessAdministrators.add;
    }

    get removeFg(): FormGroup {
        return this.updateStateService.forms.mspAccessAdministrators.remove;
    }

    get updateFg(): FormGroup {
        return this.updateStateService.forms.mspAccessAdministrators.update;
    }


     addAccessAdmin() {
        this.showAddAccessAdmin = true;
    }

    removeAccessAdmin() {
        this.showRemoveAccessAdmin = true;
    }

    updateAccessAdmin() {
        this.showUpdateAccessAdmin = true;
    }

    cancelAddAccessAdmin() {
        this.showAddAccessAdmin = false;
        this.updateStateService.forms.mspAccessAdministrators.add = null;
    }

    cancelRemoveAccessAdmin() {
        this.showRemoveAccessAdmin = false;
        this.updateStateService.forms.mspAccessAdministrators.remove = null;
    }

    cancelUpdateAccessAdmin() {
        this.showUpdateAccessAdmin = false;
        this.updateStateService.forms.mspAccessAdministrators.update = null;
    }

}
