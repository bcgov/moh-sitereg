import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MspRegistrationService } from './msp-registration.service';
@Injectable({
    providedIn: 'root',
})
export class MspRegistrationGuard implements CanActivateChild {
    constructor(
        private registrationService: MspRegistrationService,
        private router: Router
    ) {}

    canActivateChild(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        // console.log(
        //     '%c CanActivateChild: %o %o',
        //     'color:green',
        //     this.router.url,
        //     state.url
        // );

        // console.log('%o: route guards', this.registrationService.registrationItems);
        return this.registrationService.moveNext(this.router.url, state.url);
    }
}
