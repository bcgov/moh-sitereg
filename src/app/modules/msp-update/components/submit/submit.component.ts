import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';

@Component({
    selector: 'sitereg-msp-update-submit',
    templateUrl: './submit.component.html',
    styleUrls: ['./submit.component.sass'],
})
export class MspDirectUpdateSubmitComponent implements OnInit {
    constructor(
        private router: Router,
        private progressService: MspDirectUpdateProgressService
    ) { }

    ngOnInit() {
        this.progressService.setItemIncomplete();
    }

    continue() {
        this.progressService.enableConfirmation = true;
        this.progressService.setItemComplete();
        this.router.navigate([ROUTES_UPDATE.CONFIRMATION.fullpath]);
    }
}
