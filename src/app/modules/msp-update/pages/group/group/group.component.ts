import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { MspDirectUpdateProgressService } from '../../../services/progress.service';
import { LoggerService } from '@shared/services/logger.service';
import { UpdateStateService, FormStatusAddRemoveUpdate } from '../../../services/update.state.service';
import { ROUTES_UPDATE } from '../../../routing/routes.constants';
import { MspDirectUpdateGroupRemoveComponent } from '../group-remove/group-remove.component';
import { MspDirectUpdateGroupAddComponent } from '../group-add/group-add.component';
import { MspDirectUpdateGroupEditComponent } from '../group-edit/group-edit.component';


@Component({
    selector: 'sitereg-msp-update-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.scss'],
})
export class MspDirectUpdateGroupComponent implements OnInit {

  public showAddGrp = false;
  public showRemoveGrp = false;
  public showEditGrp = false;
  public isFormHasData: FormStatusAddRemoveUpdate;

  constructor( private router: Router,
               private progressService: MspDirectUpdateProgressService,
               private loggerSvc: LoggerService,
               private globalConfigSvc: GlobalConfigService,
               public updateStateService: UpdateStateService,
               private fb: FormBuilder ) {

  }

  ngOnInit() {
    this.progressService.setPageIncomplete();

    this.showAddGrp = this.formAddState ? true : false;
    this.showRemoveGrp = this.formRemoveState ? true : false;
    this.showEditGrp = this.formEditState ? true : false;

    this.updateStateService.formsStatusChanges$.subscribe(x =>
      this.isFormHasData = x.mspGroups
  );

  }

  get buttonLabel() {
    return this.isUpdate || this.isFormHasData.hasData ? 'Continue' : 'Skip';
  }

  // Form action bar functions
  continue() {
    // splunk-log
    this.loggerSvc.logNavigation(
        this.constructor.name,
        `Valid Data - Continue button clicked. ${
            this.globalConfigSvc.applicationId
        }`
    );
    this.progressService.setPageComplete();
    this.router.navigate([ROUTES_UPDATE.REVIEW.fullpath]);
  }

  canContinue() {
    return !this.isUpdate ? true : [this.formAddState, this.formRemoveState, this.formEditState]
                            .filter(x => x !== null && x !== undefined) // only check added form
                            .map(x => x.valid) // get validity
                            .filter(x => x === false) // get invalid forms
                            .length === 0;
  }

  private get isUpdate(): boolean {
    return !( this.showAddGrp === false &&
              this.showRemoveGrp === false &&
              this.showEditGrp === false );
  }


  //#region REMOVE

    // tslint:disable-next-line: member-ordering
    @ViewChild(MspDirectUpdateGroupRemoveComponent)
    formRemove: MspDirectUpdateGroupRemoveComponent;

    get formRemoveState(): FormGroup {
        return this.updateStateService.forms.mspGroups.remove;
    }

    formRemoveStateChanged(formGroups: any) {
        this.updateStateService.forms.mspGroups.remove = formGroups;
        this.updateStateService.formStatusChanged();
        this.showRemoveGrp = this.formRemove.getFormsCount > 0 ? true : false;
    }

    formRemoveNew() {
        this.formRemove.newForm();
    }

    //#endregion

  //#region Add

    // tslint:disable-next-line: member-ordering
    @ViewChild(MspDirectUpdateGroupAddComponent)
    formAdd: MspDirectUpdateGroupAddComponent;

    get formAddState(): FormGroup {
        return this.updateStateService.forms.mspGroups.add;
    }

    formAddStateChanged(formGroups: any) {
        this.updateStateService.forms.mspGroups.add = formGroups;
        this.updateStateService.formStatusChanged();
        this.showAddGrp = this.formAdd.getFormsCount > 0 ? true : false;
    }

    formAddNew() {
        this.formAdd.newForm();
    }

  //#endregion

  //#region Update

    // tslint:disable-next-line: member-ordering
    @ViewChild(MspDirectUpdateGroupEditComponent)
    formEdit: MspDirectUpdateGroupEditComponent;

    get formEditState(): FormGroup {
        return this.updateStateService.forms.mspGroups.update;
    }

    formEditStateChanged(formGroups: any) {
        this.updateStateService.forms.mspGroups.update = formGroups;
        this.updateStateService.formStatusChanged();
        this.showEditGrp = this.formEdit.getFormsCount > 0 ? true : false;
    }

    formEditNew() {
        this.formEdit.newForm();
    }

  //#endregion

}
