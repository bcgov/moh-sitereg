import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConfigService } from '@shared/services/global-config.service';

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
        this.router.navigate(['msp-registration/organization']);
    }
}
