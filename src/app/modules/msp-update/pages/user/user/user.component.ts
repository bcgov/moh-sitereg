import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../../services/progress.service';
import { ROUTES_UPDATE } from '../../../routing/routes.constants';
import { funcRemoveStrings } from '@msp-register/constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { UpdateStateService } from '../../../services/update.state.service';
import { MspDirectUpdateUserRemoveComponent } from '../user-remove/user-remove.component';
import { MspDirectUpdateUserAddComponent } from '../user-add/user-add.component';
import { MspDirectUpdateUserEditComponent } from '../user-edit/user-edit.component';

@Component({
    selector: 'sitereg-msp-update-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss'],
})
export class MspDirectUpdateUserComponent implements OnInit{


    public validFormControl: (fg: FormGroup, name: string) => boolean;
    public showAddUser = false;
    public showRemoveUser = false;
    public showUpdateUser = false;

    private get isUpdate(): boolean {
        return !(this.showAddUser === false &&
            this.showRemoveUser === false &&
            this.showUpdateUser === false);
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
        this.showUpdateUser = this.formEdit.getFormsCount > 0 ? true : false;
    }

    formEditNew() {
        this.formEdit.newForm();
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
        this.showAddUser = this.formAdd.getFormsCount > 0 ? true : false;
    }

    formAddNew() {
        this.formAdd.newForm();
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
        this.showRemoveUser = this.formRemove.getFormsCount > 0 ? true : false;
    }

    formRemoveNew() {
        this.formRemove.newForm();
    }

    //#endregion



}
