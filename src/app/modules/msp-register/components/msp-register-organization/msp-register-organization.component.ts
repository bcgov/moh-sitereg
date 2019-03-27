import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MspRegisterStateService } from '@msp-register/services/msp-register-state.service';
import { CountryData } from '@shared/models/country-data';
import { BehaviorSubject } from 'rxjs';
import { IProvince } from '@shared/interfaces/i-provinces';
import { validFormControl } from '@msp-register/models/validator-helpers';
import { MspRegisterDataService } from '@msp-register/services/msp-register-data.service';

@Component({
    selector: 'sitereg-msp-register-organization',
    templateUrl: './msp-register-organization.component.html',
    styleUrls: ['./msp-register-organization.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MspRegisterOrganizationComponent implements OnInit {
    fg: FormGroup;
    provinces: BehaviorSubject<IProvince[]> = new BehaviorSubject<IProvince[]>(
        null
    );
    administeringFor: BehaviorSubject<string[]> = new BehaviorSubject<string[]>(
        [
            'Employees',
            'International Students',
            'Employees and International Students',
        ]
    );

    validFormControl: () => boolean;

    constructor(
        private router: Router,
        public mspRegisterStateSvc: MspRegisterStateService,
        public mspRegDataSvc: MspRegisterDataService
    ) {
        this.fg = this.mspRegisterStateSvc.mspRegisterOrganizationForm;
        this.validFormControl = validFormControl.bind(this);
        const formData = new CountryData();
        // console.log(formData);
        const options = formData.provinces.filter(
            (itm) => itm.country === 'CAN'
        );
        this.provinces.next(options);
    }

    ngOnInit() {
        this.fg.valueChanges.subscribe((obs) => {
            console.log(this.fg);

            // converts postalcode in upper case
            const postalCode = this.fg.get('postalCode');
            postalCode.patchValue(postalCode.value.toUpperCase(), {
                emitEvent: false,
            });
        });
    }

    continue() {
        console.clear();
        const orgForm = this.mspRegisterStateSvc.mspRegisterOrganizationForm;
        console.log(orgForm);
        const middleWareObject = this.mspRegDataSvc.mapOrgInformation(
            orgForm.value
        );
        console.log('Organization Middlware Object:', middleWareObject);

        // this.router.navigate(['msp-registration/signing-authority']);
    }
}
