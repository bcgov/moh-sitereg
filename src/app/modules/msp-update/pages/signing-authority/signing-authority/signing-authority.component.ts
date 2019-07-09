import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../../services/progress.service';
import { ROUTES_UPDATE } from '../../../routing/routes.constants';
import { funcRemoveStrings } from '@msp-register/constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { UpdateStateService } from '../../../services/update.state.service';
import { MspDirectUpdateSigningAuthorityRemoveComponent } from '../signing-authority-remove/signing-authority-remove.component';
import { MspDirectUpdateSigningAuthorityAddComponent } from '../signing-authority-add/signing-authority-add.component';
import { MspDirectUpdateSigningAuthorityEditComponent } from '../signing-authority-edit/signing-authority-edit.component';

@Component({
    selector: 'sitereg-msp-update-signing-authority',
    templateUrl: './signing-authority.component.html',
    styleUrls: ['./signing-authority.component.scss'],
})
export class MspDirectUpdateSigningAuthorityComponent implements OnInit{

    public validFormControl: (fg: FormGroup, name: string) => boolean;
    public showAddSigningAuthority = false;
    public showRemoveSigningAuthority = false;
    public showUpdateSigningAuthority = false;

    private get isUpdate(): boolean {
        return !(this.showAddSigningAuthority === false &&
            this.showRemoveSigningAuthority === false &&
            this.showUpdateSigningAuthority === false);
    }

    get buttonLabel(): string {
        return this.isUpdate ? 'Continue' : 'Skip';
    }

    canContinue() {
        return !this.isUpdate ? true : [this.addFg, this.formRemoveState, this.updateFg]
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
        console.log(`%c%o : %o`, 'color:green', this.componentInfo);
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
        return this.updateStateService.forms.signingAuthority.add;
    }

    get updateFg(): FormGroup {
        return this.updateStateService.forms.signingAuthority.update;
    }

    addSigningAuthority() {
        this.showAddSigningAuthority = true;
    }

    updateSigningAuthority() {
        this.showUpdateSigningAuthority = true;
    }

    cancelAddSigningAuthority() {
        this.showAddSigningAuthority = false;
        this.updateStateService.forms.signingAuthority.add = null;
    }

    cancelUpdateSigningAuthority() {
        this.showUpdateSigningAuthority = false;
        this.updateStateService.forms.signingAuthority.update = null;
    }


    //#region Edit

    // tslint:disable-next-line: member-ordering
    @ViewChild(MspDirectUpdateSigningAuthorityEditComponent)
    formEdit: MspDirectUpdateSigningAuthorityEditComponent;

    get formEditState(): FormGroup {
        return this.updateStateService.forms.signingAuthority.update;
    }

    formEditStateChanged(formGroups: any) {
        this.updateStateService.forms.signingAuthority.update = formGroups;
        this.showUpdateSigningAuthority = this.formEdit.getFormsCount > 0 ? true : false;
    }

    formEditNew() {
        this.formEdit.newForm();
    }

    //#endregion

    //#region Add

    // tslint:disable-next-line: member-ordering
    @ViewChild(MspDirectUpdateSigningAuthorityAddComponent)
    formAdd: MspDirectUpdateSigningAuthorityAddComponent;

    get formAddState(): FormGroup {
        return this.updateStateService.forms.signingAuthority.add;
    }

    formAddStateChanged(formGroups: any) {
        this.updateStateService.forms.signingAuthority.add = formGroups;
        this.showAddSigningAuthority = this.formAdd.getFormsCount > 0 ? true : false;
    }

    formAddNew() {
        this.formAdd.newForm();
    }

    //#endregion


    //#region REMOVE

    // tslint:disable-next-line: member-ordering
    @ViewChild(MspDirectUpdateSigningAuthorityRemoveComponent)
    formRemove: MspDirectUpdateSigningAuthorityRemoveComponent;

    get formRemoveState(): FormGroup {
        return this.updateStateService.forms.signingAuthority.remove;
    }

    formRemoveStateChanged(formGroups: any) {
        this.updateStateService.forms.signingAuthority.remove = formGroups;
        this.showRemoveSigningAuthority = this.formRemove.getFormsCount > 0 ? true : false;
    }

    formRemoveNew() {
        this.formRemove.newForm();
    }

    //#endregion



}
