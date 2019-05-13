import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';

@Component({
    selector: 'sitereg-msp-update-organization',
    templateUrl: './organization.component.html',
    styleUrls: ['./organization.component.sass'],
})
export class MspDirectUpdateOrganizationComponent implements OnInit {
    constructor(
        private router: Router,
        private progressService: MspDirectUpdateProgressService
    ) { }

    ngOnInit() {
        this.progressService.setItemIncomplete();
    }

    continue() {
        this.progressService.setItemComplete();
        this.router.navigate([ROUTES_UPDATE.SIGNING_AUTHORITY.fullpath]);
    }
}
