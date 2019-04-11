import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { Router } from '@angular/router';
import { validMultiFormControl } from '@msp-register/models/validator-helpers';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';
import { IMspGroup } from '@msp-register/interfaces';
import { LoggerService } from '@shared/services/logger.service';
import { GlobalConfigService } from '@shared/services/global-config.service';

@Component({
    selector: 'sitereg-msp-register-group',
    templateUrl: './msp-register-group.component.html',
    styleUrls: ['./msp-register-group.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MspRegisterGroupComponent implements OnInit {
    fgs: FormGroup[] = [];
    validFormControl: () => boolean;
    validFormGroup = this.mspRegisterStateSvc.validFormGroup;

    constructor(
        private router: Router,
        public loggerSvc: LoggerService,
        private globalConfigSvc: GlobalConfigService,
        public mspRegisterStateSvc: MspRegisterStateService,
        public mspRegDataSvc: MspRegisterDataService
    ) {
        this.updateFormGroups();
        this.validFormControl = validMultiFormControl.bind(this);

        // // debug only
        // this.fgs.forEach((fg) => {
        //     fg.valueChanges.subscribe((obs) => console.log(fg));
        // });
    }

    ngOnInit() {}

    continue() {
        this.loggerSvc.logNavigation(this.constructor.name, 'ValidForm' );
        this.debugOnly();
        this.router.navigate(['msp-registration/authorize']);
    }

    addFormGroup() {
        this.mspRegisterStateSvc.addGroup();
        this.updateFormGroups();
    }

    updateFormGroups() {
        this.fgs = this.mspRegisterStateSvc.mspRegisterGroupForm;
    }

    deleteFormGroup(i: number) {
        this.mspRegisterStateSvc.removeGroup(i);
        this.updateFormGroups();
    }

    debugOnly() {

        if (this.globalConfigSvc.currentEnironment.production === false) {

        // Msp Groups
        const mspGroups: IMspGroup[] = [];
        this.mspRegisterStateSvc.mspRegisterGroupForm.forEach((v) =>
            v.value ? mspGroups.push(v.value) : ''
        );

        const moMspGroups = this.mspRegDataSvc.mapGroupDef(mspGroups);
        console.log('MO - Group:', moMspGroups);
        }
    }
}
