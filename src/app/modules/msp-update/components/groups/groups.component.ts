import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MspDirectUpdateProgressService } from '../../services/progress.service';
import { ROUTES_UPDATE } from '../../routing/routes.constants';

@Component({
    selector: 'sitereg-msp-update-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.sass'],
})
export class MspDirectUpdateGroupsComponent implements OnInit {
    constructor(
        private router: Router,
        private progressService: MspDirectUpdateProgressService
    ) { }

    ngOnInit() {
        this.progressService.setItemIncomplete();
    }

    continue() {
        console.log('clicked %o', ROUTES_UPDATE.SUBMIT.fullpath);
        this.progressService.setItemComplete();
        this.router.navigate([ROUTES_UPDATE.SUBMIT.fullpath]);
    }
}
