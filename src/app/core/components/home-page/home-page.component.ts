import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { APPLICATION_ROUTES } from '@msp-register/constants';
import { SplashPageService } from 'src/app/modules/splash-page/splash-page.service';
import { Observable, BehaviorSubject } from 'rxjs';

@Component({
    selector: 'sitereg-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent implements OnInit {
    public showUnderConstruction = false;
    public underConstructionMessage = '';
    // disableUpdateForm = true;
    private _disableUpdateForm: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    public disableUpdateForm: Observable<boolean> = this._disableUpdateForm.asObservable();

    constructor(
        private router: Router,
        public splash: SplashPageService,
    ) { }

    ngOnInit() {
        this.splash.setup();
        this.splash.values.subscribe((splashVals) => {
            console.log(`Splash Values: %o`, splashVals);
            if (splashVals) {
                const result = splashVals.SPA_ENV_SITEREG_DISABLE_FORM2 ? splashVals.SPA_ENV_SITEREG_DISABLE_FORM2 : true;
                console.log(`disableUpdateForm: %o`, result );
                this._disableUpdateForm.next(result);
            }
        });
    }

    register() {
        this.router.navigate([`${APPLICATION_ROUTES.REGISTER}`]);
    }

    update() {
        this.router.navigate([`${APPLICATION_ROUTES.UPDATE}`]);

    }
}
