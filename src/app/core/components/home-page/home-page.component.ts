import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'sitereg-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
    constructor(private router: Router) {}

    ngOnInit() {}

    mspRegister() {
        this.router.navigate(['/msp-registration/organization']);
    }
}
