import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    CanActivateChild,
    Router,
} from '@angular/router';
import { Observable } from 'rxjs';
import { MspDirectUpdateProgressService } from '../services/progress.service';
@Injectable({
    providedIn: 'root',
})
export class MspDirectUpdateRouteGuard implements CanActivateChild {
    constructor(
        private progressService: MspDirectUpdateProgressService,
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

        // // REMOVEME - debug only
        // return true;
        // console.log('%o: route guards', this.registrationService.registrationItems);
        return this.progressService.moveNext(this.router.url, state.url);
    }
}
