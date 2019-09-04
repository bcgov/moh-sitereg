import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../../services/progress.service';
import { ROUTES_UPDATE } from '../../../routing/routes.constants';
import { funcRemoveStrings } from '@msp-register/constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import {
    UpdateStateService,
    FormStatusAddRemoveUpdate,
} from '../../../services/update.state.service';
import { MspDirectUpdateAccessAdministratorRemoveComponent } from '../access-admin-remove/access-admin-remove.component';
import { MspDirectUpdateAccessAdministratorAddComponent } from '../access-admin-add/access-admin-add.component';
import { MspDirectUpdateAccessAdministratorEditComponent } from '../access-admin-edit/access-admin-edit.component';

@Component({
    selector: 'sitereg-msp-update-access-admin',
    templateUrl: './access-admin.component.html',
    styleUrls: ['./access-admin.component.scss'],
})
export class MspDirectUpdateAccessAdministratorComponent implements OnInit {
    public validFormControl: (fg: FormGroup, name: string) => boolean;
    public showAddAccessAdmin = false;
    public showRemoveAccessAdmin = false;
    public showUpdateAccessAdmin = false;
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
        return this.isFormHasData.hasData;
    }

    get buttonLabel(): string {
        return this.isFormHasData.hasData ? 'Continue' : 'Skip';
    }

    canContinue() {
        return !this.isUpdate
            ? true
            : [this.addFg, this.formRemoveState, this.updateFg]
                  .filter((x) => x !== null && x !== undefined) // only check added form
                  .map((x) => x.valid) // get validity
                  .filter((x) => x === false).length === 0; // get invalid forms
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
    ) {}

    ngOnInit() {
        // console.log(`%c%o : %o`, 'color:green', this.componentInfo);
        this.progressService.setPageIncomplete();
        this.updateStateService.formsStatusChanges$.subscribe(
            (x) => (this.isFormHasData = x.mspAccessAdministrators)
        );
    }

    continue() {
        // splunk-log
        this.loggerSvc.logNavigation(
            this.constructor.name,
            `Valid Data - Continue button clicked. ${this.globalConfigSvc.applicationId}`
        );
        this.progressService.setPageComplete();
        this.router.navigate([ROUTES_UPDATE.USERS.fullpath]);
    }

    get addFg(): FormGroup {
        return this.updateStateService.forms.mspAccessAdministrators.add;
    }

    get updateFg(): FormGroup {
        return this.updateStateService.forms.mspAccessAdministrators.update;
    }

    addAccessAdmin() {
        this.showAddAccessAdmin = true;
    }

    updateAccessAdmin() {
        this.showUpdateAccessAdmin = true;
    }

    cancelAddAccessAdmin() {
        this.showAddAccessAdmin = false;
        this.updateStateService.forms.mspAccessAdministrators.add = null;
    }

    cancelUpdateAccessAdmin() {
        this.showUpdateAccessAdmin = false;
        this.updateStateService.forms.mspAccessAdministrators.update = null;
    }

    //#region Edit

    // tslint:disable-next-line: member-ordering
    @ViewChild(MspDirectUpdateAccessAdministratorEditComponent)
    formEdit: MspDirectUpdateAccessAdministratorEditComponent;

    get formEditState(): FormGroup {
        return this.updateStateService.forms.mspAccessAdministrators.update;
    }

    formEditStateChanged(formGroups: any) {
        this.updateStateService.forms.mspAccessAdministrators.update = formGroups;
        this.updateStateService.formStatusChanged();
    }

    formEditNew() {
        this.formEdit.newForm();
        this.updateDisplayOrder('edit');
    }

    //#endregion

    //#region Add

    // tslint:disable-next-line: member-ordering
    @ViewChild(MspDirectUpdateAccessAdministratorAddComponent)
    formAdd: MspDirectUpdateAccessAdministratorAddComponent;

    get formAddState(): FormGroup {
        return this.updateStateService.forms.mspAccessAdministrators.add;
    }

    formAddStateChanged(formGroups: any) {
        this.updateStateService.forms.mspAccessAdministrators.add = formGroups;
        this.updateStateService.formStatusChanged();
    }

    formAddNew() {
        this.formAdd.newForm();
        this.updateDisplayOrder('add');
    }

    //#endregion

    //#region REMOVE

    // tslint:disable-next-line: member-ordering
    @ViewChild(MspDirectUpdateAccessAdministratorRemoveComponent)
    formRemove: MspDirectUpdateAccessAdministratorRemoveComponent;

    get formRemoveState(): FormGroup {
        return this.updateStateService.forms.mspAccessAdministrators.remove;
    }

    formRemoveStateChanged(formGroups: any) {
        this.updateStateService.forms.mspAccessAdministrators.remove = formGroups;
        this.updateStateService.formStatusChanged();
    }

    formRemoveNew() {
        this.formRemove.newForm();
        this.updateDisplayOrder('remove');
    }

    //#endregion
}
