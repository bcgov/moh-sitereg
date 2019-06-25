import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { funcRemoveStrings } from '@msp-register/constants';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { UpdateStateService } from '../../services/update.state.service';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';

@Component({
    selector: 'sitereg-msp-update-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss'],
})
export class MspDirectUpdateUsersComponent implements OnInit {
  public showAddUser = false;
  public showRemoveUser = false;
  public showUpdateUser = false;

  constructor( private router: Router,
               private progressService: MspDirectUpdateProgressService,
               private loggerSvc: LoggerService,
               private globalConfigSvc: GlobalConfigService,
               public updateStateService: UpdateStateService,
               private fb: FormBuilder ) {

  }

  ngOnInit() {
    this.progressService.setPageIncomplete();
    this.showAddUser = this.addFg ? true : false;
    this.showRemoveUser = this.removeFg ? true : false;
    this.showUpdateUser = this.updateFg ? true : false;
}

  get buttonLabel(): string {
    return this.isUpdate ? 'Continue' : 'Skip';
  }

  /**
   * We have to use getters here, as values change to null which means the reference is broken.
   */
  get addFg(): FormGroup {
    return this.updateStateService.forms.mspUsers.add;
  }

  get removeFg(): FormGroup {
    return this.updateStateService.forms.mspUsers.remove;
  }

  get updateFg(): FormGroup {
    return this.updateStateService.forms.mspUsers.update;
  }

  get addUserArray() {
    return this.addFg.get('addUserItems') as FormArray;
  }

  get removeUserArray() {
    return this.removeFg.get('removeUserItems') as FormArray;
  }

  get updateUserArray() {
    return this.updateFg.get('updateUserItems') as FormArray;
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

  canContinue() {
    return !this.isUpdate ? true : [this.addFg, this.removeFg, this.updateFg]
                            .filter(x => x !== null && x !== undefined) // only check added form
                            .map(x => x.valid) // get validity
                            .filter(x => x === false) // get invalid forms
                            .length === 0;
  }



  addUser() {
    console.log( 'Add User clicked: ', this.addFg );
    this.showAddUser = true;


  }

  removeUser() {
    this.showRemoveUser = true;
  }

  updateUser() {
    this.showUpdateUser = true;

  }

  deleteAddUserItem( idx: number ) {
    console.log( 'X-icon button clicked - need logic to delete item', idx );
    /*
    this.addUserArray.removeAt( idx );

    // TODO: confirm assumption - if user removes all entries, set flag to false not show.
    this.showAddUser = ( this.addUserArray.length !== 0 );
    */
  }




  private get isUpdate(): boolean {
    return !( this.showAddUser === false &&
              this.showRemoveUser === false &&
              this.showUpdateUser === false );
  }

}
