import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { FormGroup, FormBuilder, FormArray, Validators, FormControl } from '@angular/forms';
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

  constructor( private router: Router,
               private progressService: MspDirectUpdateProgressService,
               private loggerSvc: LoggerService,
               private globalConfigSvc: GlobalConfigService,
               public updateStateService: UpdateStateService,
               private fb: FormBuilder ) {

  }

  ngOnInit() {
    this.progressService.setPageIncomplete();
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

  createMspGrpItem(): FormGroup {
    return this.fb.group({
          groupNo: ['', Validators.required]
         // thirdPartyAdmin: ''
        });
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
  }

  updateMspGroupAdmin() {
    console.log( 'Update administration of Msp Group clicked' );
    this.showUpdateMspGrpAdmin = true;
  }

  // X-icon button functions
  deleteItem() {
    console.log( 'X-icon button clicked - need logic to delete item' );
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
    return true; // TODO: Add logic to this function - fields required when add/remove/update
    /*return [this.addFg, this.removeFg, this.updateFg]
      .filter(x => x !== null && x !== undefined) // only check added form
      .map(x => x.valid) // get validity
      .filter(x => x === false) // get invalid forms
      .length === 0;*/
  }

  private get isUpdate(): boolean {
    return !( this.showAddMspGrp === false &&
              this.showRemoveMspGrp === false &&
              this.showUpdateMspGrpAdmin === false );
  }
}
