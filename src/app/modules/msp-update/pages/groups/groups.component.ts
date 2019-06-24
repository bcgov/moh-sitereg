import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { UpdateStateService } from '../../services/update.state.service';

@Component({
    selector: 'sitereg-msp-update-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
})
export class MspDirectUpdateGroupsComponent implements OnInit {

  public showAddMspGrp = false;
  public showRemoveMspGrp = false;
  public showUpdateMspGrpAdmin = false;

  public radioBtnLabels = [{label: 'No', value: '0'}, {label: 'Yes', value: '1'}];

  constructor( private router: Router,
               private progressService: MspDirectUpdateProgressService,
               private loggerSvc: LoggerService,
               private globalConfigSvc: GlobalConfigService,
               public updateStateService: UpdateStateService,
               private fb: FormBuilder ) {

  }

  ngOnInit() {
    this.progressService.setPageIncomplete();
    this.showAddMspGrp = this.addFg ? true : false;
    this.showRemoveMspGrp = this.removeFg ? true : false;
    this.showUpdateMspGrpAdmin = this.updateFg ? true : false;
  }

  get buttonLabel() {
    return this.isUpdate ? 'Continue' : 'Skip';
  }

  /**
   * We have to use getters here, as values change to null which means the reference is broken.
   */
  get addFg(): FormGroup {
    return this.updateStateService.forms.mspGroups.add;
  }

  get removeFg(): FormGroup {
    return this.updateStateService.forms.mspGroups.remove;
  }

  get updateFg(): FormGroup {
    return this.updateStateService.forms.mspGroups.update;
  }

  get addGrpArray() {
    return this.addFg.get('addGrpItems') as FormArray;
  }

  get removeGrpArray() {
    return this.removeFg.get('removeGrpItems') as FormArray;
  }

  get updateGrpArray() {
    return this.updateFg.get('updateGrpItems') as FormArray;
  }

  createMspGrpItem(): FormGroup {
    // TODO: Figure out why minlength valiator is not working, also need to add pattern
    // check to msp-grp-no component
    return this.fb.group({
          groupNo: ['', [Validators.required, Validators.minLength(7)]],
          thirdPartyAdmin: ['', Validators.required]
        }, {updateOn: 'blur'});
  }

  createMspNoItem(): FormGroup {
    // TODO: Figure out why minlength valiator is not working, also need to add patten
    // check to msp-grp-no component
    return this.fb.group({
          groupNo: ['', [Validators.required, Validators.minLength(7)]]
        }, {updateOn: 'blur'});
  }

  // Button functions
  addMspGroup() {
    console.log( 'Add Msp Group clicked: ', this.addFg );
    this.showAddMspGrp = true;

    // Form group not created
    if ( !this.updateStateService.forms.mspGroups.add ) {

      this.updateStateService.forms.mspGroups.add = this.fb.group({
        addGrpItems: this.fb.array( [ this.createMspGrpItem() ] )
      });
    } else {
      this.addGrpArray.push( this.createMspGrpItem() );
    }

    console.log( 'Create Add Msp Group: ', this.addFg, this.addGrpArray );
  }

  removeMspGroup() {
    console.log( 'Remove Msp Group clicked' );
    this.showRemoveMspGrp = true;

    // Form group not created
    if ( !this.updateStateService.forms.mspGroups.remove ) {

      this.updateStateService.forms.mspGroups.remove = this.fb.group({
        removeGrpItems: this.fb.array( [ this.createMspNoItem() ] )
      });
    } else {
      this.removeGrpArray.push( this.createMspNoItem() );
    }

    console.log( 'Create Remove Msp Group: ', this.removeFg, this.removeGrpArray );
  }

  updateMspGroupAdmin() {
    console.log( 'Update administration of Msp Group clicked' );
    this.showUpdateMspGrpAdmin = true;

    // Form group not created
    if ( !this.updateStateService.forms.mspGroups.update ) {

      this.updateStateService.forms.mspGroups.update = this.fb.group({
        updateGrpItems: this.fb.array( [ this.createMspGrpItem() ] )
      });
    } else {
      this.updateGrpArray.push( this.createMspGrpItem() );
    }

    console.log( 'Create Update Msp Group Administrator: ', this.updateFg, this.updateGrpArray );
  }

  // X-icon button functions
  deleteAddGrpItem( idx: number ) {
    console.log( 'X-icon button clicked - need logic to delete item', idx );
    this.addGrpArray.removeAt( idx );

    // TODO: confirm assumption - if user removes all entries, set flag to false not show.
    this.showAddMspGrp = ( this.addGrpArray.length !== 0 );
  }

  deleteRemoveGrpItem( idx: number ) {
    console.log( 'X-icon button clicked - need logic to delete item', idx );
    this.removeGrpArray.removeAt( idx );

    // TODO: confirm assumption - if user removes all entries, set flag to false not show.
    this.showRemoveMspGrp = ( this.removeGrpArray.length !== 0 );
  }

  deleteUpdateGrpItem( idx: number ) {
    console.log( 'X-icon button clicked - need logic to delete item', idx );
    this.updateGrpArray.removeAt( idx );

    // TODO: confirm assumption - if user removes all entries, set flag to false not show.
    this.showUpdateMspGrpAdmin = ( this.updateGrpArray.length !== 0 );
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
    this.router.navigate([ROUTES_UPDATE.SUBMIT.fullpath]);
  }

  canContinue() {
    return !this.isUpdate ? true : [this.addFg, this.removeFg, this.updateFg]
                            .filter(x => x !== null && x !== undefined) // only check added form
                            .map(x => x.valid) // get validity
                            .filter(x => x === false) // get invalid forms
                            .length === 0;
  }

  private get isUpdate(): boolean {
    return !( this.showAddMspGrp === false &&
              this.showRemoveMspGrp === false &&
              this.showUpdateMspGrpAdmin === false );
  }
}
