import { Component, OnInit } from '@angular/core';
import { SplashPageService } from './modules/splash-page/splash-page.service';
import { environment } from 'src/environments/environment';

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
    constructor(public splash: SplashPageService,) {
    }

    ngOnInit() {
        if (!environment.bypassSplashPage){
            this.splash.setup();
          }
    }
}
