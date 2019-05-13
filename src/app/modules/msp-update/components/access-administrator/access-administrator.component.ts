import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';

@Component({
    selector: 'sitereg-msp-update-access-administrator',
    templateUrl: './access-administrator.component.html',
    styleUrls: ['./access-administrator.component.sass'],
})
export class MspDirectUpdateAccessAdministratorComponent implements OnInit {
    constructor(
        private router: Router,
        private progressService: MspDirectUpdateProgressService
    ) { }

    ngOnInit() {
        this.progressService.setItemIncomplete();
    }

    continue() {
        this.progressService.setItemComplete();
        this.router.navigate([ROUTES_UPDATE.USERS.fullpath]);
    }
}
