import { Component } from '@angular/core';
import * as version from '../version.GENERATED';

@Component({
    selector: 'sitereg-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'moh-sitereg';

    constructor() {
        version.success
            ? console.log('%c' + version.message, 'color: #036; font-size: 20px;')
            : console.error(version.message);
    }
}
