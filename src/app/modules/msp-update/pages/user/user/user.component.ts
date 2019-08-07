import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../../services/progress.service';
import { ROUTES_UPDATE } from '../../../routing/routes.constants';
import { funcRemoveStrings } from '@msp-register/constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { UpdateStateService, FormStatusAddRemoveUpdate } from '../../../services/update.state.service';
import { MspDirectUpdateUserRemoveComponent } from '../user-remove/user-remove.component';
import { MspDirectUpdateUserAddComponent } from '../user-add/user-add.component';
import { MspDirectUpdateUserEditComponent } from '../user-edit/user-edit.component';

@Component({
    selector: 'sitereg-msp-update-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class MspDirectUpdateUserComponent implements OnInit {


    public validFormControl: (fg: FormGroup, name: string) => boolean;
    public showAddUser = false;
    public showRemoveUser = false;
    public showUpdateUser = false;
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
        // console.log(`%c%o : %o`, 'color:green', this.componentInfo);
        this.progressService.setPageIncomplete();
        this.updateStateService.formsStatusChanges$.subscribe(x =>
            this.isFormHasData = x.mspUsers
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
        this.router.navigate([ROUTES_UPDATE.GROUP_NUMBERS.fullpath]);
    }

    get addFg(): FormGroup {
        return this.updateStateService.forms.mspUsers.add;
    }

    get updateFg(): FormGroup {
        return this.updateStateService.forms.mspUsers.update;
    }

    addAccessAdmin() {
        this.showAddUser = true;
    }

    updateAccessAdmin() {
        this.showUpdateUser = true;
    }

    cancelAddAccessAdmin() {
        this.showAddUser = false;
        this.updateStateService.forms.mspUsers.add = null;
    }

    cancelUpdateAccessAdmin() {
        this.showUpdateUser = false;
        this.updateStateService.forms.mspUsers.update = null;
    }


    //#region Edit

    // tslint:disable-next-line: member-ordering
    @ViewChild(MspDirectUpdateUserEditComponent)
    formEdit: MspDirectUpdateUserEditComponent;

    get formEditState(): FormGroup {
        return this.updateStateService.forms.mspUsers.update;
    }

    formEditStateChanged(formGroups: any) {
        this.updateStateService.forms.mspUsers.update = formGroups;
        this.updateStateService.formStatusChanged();
    }

    formEditNew() {
        this.formEdit.newForm();
        this.updateDisplayOrder('edit');
    }

    //#endregion

    //#region Add

    // tslint:disable-next-line: member-ordering
    @ViewChild(MspDirectUpdateUserAddComponent)
    formAdd: MspDirectUpdateUserAddComponent;

    get formAddState(): FormGroup {
        return this.updateStateService.forms.mspUsers.add;
    }

    formAddStateChanged(formGroups: any) {
        this.updateStateService.forms.mspUsers.add = formGroups;
        this.updateStateService.formStatusChanged();
    }

    formAddNew() {
        this.formAdd.newForm();
        this.updateDisplayOrder('add');
    }

    //#endregion


    //#region REMOVE

    // tslint:disable-next-line: member-ordering
    @ViewChild(MspDirectUpdateUserRemoveComponent)
    formRemove: MspDirectUpdateUserRemoveComponent;

    get formRemoveState(): FormGroup {
        return this.updateStateService.forms.mspUsers.remove;
    }

    formRemoveStateChanged(formGroups: any) {
        this.updateStateService.forms.mspUsers.remove = formGroups;
        this.updateStateService.formStatusChanged();
    }

    formRemoveNew() {
        this.formRemove.newForm();
        this.updateDisplayOrder('remove');
    }

    //#endregion



}
