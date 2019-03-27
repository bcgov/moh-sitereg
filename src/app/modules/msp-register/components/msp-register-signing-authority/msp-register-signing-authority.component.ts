import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { IUser } from '@msp-register/interfaces';
import { validFormControl } from '@msp-register/models/validator-helpers';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';

@Component({
    selector: 'sitereg-msp-register-signing-authority',
    templateUrl: './msp-register-signing-authority.component.html',
    styleUrls: ['./msp-register-signing-authority.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MspRegisterSigningAuthorityComponent implements OnInit {
    [x: string]: any;
    fg: FormGroup;
    validFormControl: () => boolean;

    constructor(
        private router: Router,
        private mspRegisterStateSvc: MspRegisterStateService,
        public mspRegDataSvc: MspRegisterDataService
    ) {
        this.fg = this.mspRegisterStateSvc.mspRegisterSigningAuthorityForm;
        this.validFormControl = validFormControl.bind(this);
        this.fg.valueChanges.subscribe((obs) => console.log(this.fg));
    }

    ngOnInit() {}

    updateFormData(obj: IUser) {
        // tslint:disable-next-line: forin
        for (const key in obj) {
            if (!this.fg.controls[key]) return;
            this.fg.controls[key].setValue(obj[key]);
        }
    }

    continue() {
        console.clear();
        const form = this.mspRegisterStateSvc.mspRegisterSigningAuthorityForm;
        console.log(form);
        const middleWareObject = this.mspRegDataSvc.mapSigningAuthorityInformationDef(
            form.value
        );
        console.log('Signing Authority Middlware Object:', middleWareObject);
        // this.router.navigate(['msp-registration/access-admins']);
    }
}
