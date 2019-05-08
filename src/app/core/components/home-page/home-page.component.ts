import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { APPLICATION_ROUTES } from '@msp-register/constants';

@Component({
    selector: 'sitereg-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {}

    register() {
        this.router.navigate([`${APPLICATION_ROUTES.REGISTER}`]);
    }

    update() {
        this.router.navigate([`${APPLICATION_ROUTES.UPDATE}`]);
    }
}
