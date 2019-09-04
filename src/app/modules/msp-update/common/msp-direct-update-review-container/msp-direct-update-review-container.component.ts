import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ROUTES_UPDATE } from '../../routing/routes.constants';

@Component({
    selector: 'sitereg-update-review-container',
    templateUrl: './msp-direct-update-review-container.component.html',
    styleUrls: ['./msp-direct-update-review-container.component.scss'],
})
export class MspDirectUpdateReviewContainerComponent implements OnInit {
    @Input() header: string | null;
    @Input() redirectPath: string | null;
    @Input() sectionItems: any | null;

    constructor(private router: Router) {}

    ngOnInit() {}

    redirect(routeName: string) {
        this.router.navigate([routeName]);
    }
}
