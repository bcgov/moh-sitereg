import { Component, OnInit } from '@angular/core';
import { ROUTES_UPDATE } from '../../routing/routes.constants';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';

@Component({
    selector: 'sitereg-msp-update-identify',
    templateUrl: './identify.component.html',
    styleUrls: ['./identify.component.sass'],
})
export class MspDirectUpdateIdentifyComponent implements OnInit {
    constructor(
        private router: Router,
        private progressService: MspDirectUpdateProgressService
    ) { }

    ngOnInit() {
        this.progressService.setItemIncomplete();
    }

    continue() {
        this.progressService.setItemComplete();
        this.router.navigate([ROUTES_UPDATE.ORGANIZATION.fullpath]);
    }
}
