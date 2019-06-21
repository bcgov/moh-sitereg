import { Component, OnInit } from '@angular/core';
import { SplashPageService } from './modules/splash-page/splash-page.service';
import { environment } from 'src/environments/environment.prod';
import * as version from '../version.GENERATED';
import { GlobalConfigService } from '@shared/services/global-config.service';

@Component({
    selector: 'sitereg-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'moh-sitereg';
    /**
     *
     */
    constructor(
        public splash: SplashPageService,
        private globalConfigSvc: GlobalConfigService
    ) { }

    ngOnInit() {
        if (!environment.bypassSplashPage) {
            this.splash.setup();
        }
        version.success
            ? console.log('%c' + version.message, 'color: #036; font-size: 20px;')
            : console.error(version.message);

        this.splash.values.subscribe((splashVals) => {
            // console.log(splashVals);
            if (splashVals) {
                this.globalConfigSvc.debug = splashVals.SPA_ENV_SITEREG_DEBUG;

            }
        });
    }
}
