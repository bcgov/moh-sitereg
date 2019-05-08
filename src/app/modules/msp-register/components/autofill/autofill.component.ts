import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConfigService } from '@shared/services/global-config.service';
import { MSP_REGISTER_ROUTES } from '@msp-register/constants';

@Component({
    selector: 'sitereg-autofill',
    templateUrl: './autofill.component.html',
    styleUrls: ['./autofill.component.scss'],
})
export class MspRegisterAutofillComponent implements OnInit {
    constructor(
        private router: Router,
        private globalConfigSvc: GlobalConfigService
    ) {}

    ngOnInit() {
        GlobalConfigService.autofillOn();
        this.router.navigate([MSP_REGISTER_ROUTES.ORGANIZATION.fullpath]);
    }
}
