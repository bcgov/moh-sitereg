import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../../services/progress.service';
import { ROUTES_UPDATE } from '../../../routing/routes.constants';
import { funcRemoveStrings } from '@msp-register/constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { UpdateStateService, FormStatusAddRemoveUpdate } from '../../../services/update.state.service';
import { MspDirectUpdateSigningAuthorityRemoveComponent } from '../signing-authority-remove/signing-authority-remove.component';
import { MspDirectUpdateSigningAuthorityAddComponent } from '../signing-authority-add/signing-authority-add.component';
import { MspDirectUpdateSigningAuthorityEditComponent } from '../signing-authority-edit/signing-authority-edit.component';

@Component({
    selector: 'sitereg-msp-update-signing-authority',
    templateUrl: './signing-authority.component.html',
    styleUrls: ['./signing-authority.component.scss'],
})
export class MspDirectUpdateSigningAuthorityComponent implements OnInit {

    public validFormControl: (fg: FormGroup, name: string) => boolean;
    public showAddSigningAuthority = false;
    public showRemoveSigningAuthority = false;
    public showUpdateSigningAuthority = false;
    public isFormHasData: FormStatusAddRemoveUpdate;

    public displayOrder = {
        add: 0,
        remove: 0,
        edit: 0,
    };

    public updateDisplayOrder(actionType: 'add' | 'remove' | 'edit') {
        if (actionType === 'add') {
            this.displayOrder.add = 1;
            this.displayOrder.remove = 2;
            this.displayOrder.edit = 3;
        }
        if (actionType === 'remove') {
            this.displayOrder.remove = 1;
            this.displayOrder.add = 2;
            this.displayOrder.edit = 3;
        }
        if (actionType === 'edit') {
            this.displayOrder.edit = 1;
            this.displayOrder.remove = 2;
            this.displayOrder.add = 3;
        }
    }

    private get isUpdate(): boolean {
        return !(this.showAddSigningAuthority === false &&
            this.showRemoveSigningAuthority === false &&
            this.showUpdateSigningAuthority === false);
    }

    get buttonLabel(): string {
        return this.isUpdate || this.isFormHasData.hasData ? 'Continue' : 'Skip';
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
        // // console.log(`%c%o : %o`, 'color:green', this.componentInfo);
        this.progressService.setPageIncomplete();
        this.updateButtonStates();
        this.updateStateService.formsStatusChanges$.subscribe(x =>
            this.isFormHasData = x.signingAuthority
        );
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
        this.router.navigate([ROUTES_UPDATE.ACCESS_ADMINS.fullpath]);
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

    updateButtonStates() {

        const form = this.updateStateService.forms.signingAuthority;

        const formsRemove = form.remove ? form.remove.get('arrayOfForms') as FormArray | null : null;
        this.showRemoveSigningAuthority = formsRemove && formsRemove.controls.length > 0 ? true : false;

        const formsAdd = form.add ? form.add.get('arrayOfForms') as FormArray | null : null;
        this.showAddSigningAuthority = formsAdd && formsAdd.controls.length > 0 ? true : false;

        const formsEdit = form.update ? form.update.get('arrayOfForms') as FormArray | null : null;
        this.showUpdateSigningAuthority = formsEdit && formsEdit.controls.length > 0 ? true : false;

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
        this.updateStateService.formStatusChanged();
        this.updateButtonStates();
    }

    formEditNew() {
        this.formEdit.newForm();
        this.updateDisplayOrder('edit');
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
        this.updateStateService.formStatusChanged();
        this.updateButtonStates();
    }

    formAddNew() {
        this.formAdd.newForm();
        this.updateDisplayOrder('add');
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
        this.updateStateService.formStatusChanged();
        this.updateButtonStates();
    }

    formRemoveNew() {
        this.formRemove.newForm();
        this.updateDisplayOrder('remove');
    }

    //#endregion
}
