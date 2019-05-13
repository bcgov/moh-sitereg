import { Injectable } from '@angular/core';
import {
    Router,
    UrlTree,
    UrlSegmentGroup,
    PRIMARY_OUTLET,
    UrlSegment,
} from '@angular/router';
import { ROUTES_UPDATE } from '../routing/routes.constants';

export interface ProgressItem {
    route: string;
    isComplete: boolean;
    order: number;
}

@Injectable({
    providedIn: 'root',
})
export class MspDirectUpdateProgressService {
    //#region properties

    public enableConfirmation = false;

    public items: ProgressItem[] = [];

    /**
     * url of the component using this service.
     */
    get getRouterURL(): string {
        return this.getLastSegmentOfUrl(this.router.url);
    }

    //#endregion

    constructor(private router: Router) {}

    //#region Methods

    /**
     * Updats ordered steps to complete registeration
     */
    getUpdateItems() {
        this.items = Object.values(ROUTES_UPDATE).map((routeInfo) => {
            return {
                order: routeInfo.order,
                route: routeInfo.path,
                isComplete: false,
            };
        });
        console.log(`%c %o`, 'color:green', this.items);
    }

    /**
     * validates is next component url route is ordered or not
     */
    moveNext(currentUrl: string, nextUrl: string): boolean {
        const cUrl = this.getLastSegmentOfUrl(currentUrl);
        const nUrl = this.getLastSegmentOfUrl(nextUrl);

        const current = this.getProgressItem(cUrl);
        const next = this.getProgressItem(nUrl);

        // console.log('Current: %o', current);
        // console.log('Next : %o', next);

        // first time loading of registration
        if (!(next && current)) return true;

        // allows to jump at start and first step loading
        if (next && next.order === 1) return true;

        // allows to go back in registration steps
        if (next && current && next.order < current.order) return true;

        // allows to move forward to next step only in registration steps
        if (
            current &&
            current.isComplete === true &&
            current.order + 1 === next.order
        ) {
            return true;
        }

        return false;
    }

    /**
     *  Sets page to not be completed, so applicants cannot complete application out of sequence
     */
    setItemIncomplete(): void {
        const idx = this.getUrlIndex(this.getRouterURL);
        if (!this.isEmpty()) {
            // Check guards could be turned off in dev environment
            this.items = this.items.map((item, index) => {
                if (index >= idx) {
                    item.isComplete = false;
                }
                return item;
            });
        }
        // this.log('setItemIncomplete');
    }

    /**
     * Sets the page to completed, allowing applicant to proceed to next page.
     */
    setItemComplete(): void {
        const idx = this.getUrlIndex(this.getRouterURL);
        if (!this.isEmpty()) {
            // Check guards could be turned in dev environment
            this.items[idx].isComplete = true;
        }
        // this.log('setItemComplete');
    }

    /**
     * returns Progress Item { order, path, title } based on provided url
     * todo: instead of include use exact
     * @param url component route url
     */
    private getProgressItem(url: string): ProgressItem | null {
        const index = this.items.findIndex((x) => url.includes(x.route));
        return index > -1 ? this.items[index] : null;
    }

    /**
     * Checks if registration item list is present
     */
    isEmpty(): boolean {
        return this.items.length === 0;
    }

    /**
     * Check for incomplete registration pages
     */
    isRegistrationComplete(): boolean {
        const incompletePages = this.items.filter((x) => x.isComplete !== true);
        return incompletePages.length !== 0 ? false : true;
    }

    //#endregion

    //#region utitlity methods

    /**
     * returns the last segment of the route url i.e http://localhost/msp-registration/authorize returns authorize
     * @param url component route url
     */
    private getLastSegmentOfUrl(url): string {
        const tree: UrlTree = this.router.parseUrl(url);
        const sg: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        if (sg) {
            const s: UrlSegment[] = sg.segments;
            return s.length > 1 ? s[1].path : '';
        }
        return '';
    }

    /**
     * Index of URL in the registration items list, -1 if not exist
     */
    private getUrlIndex(url: string): number {
        return this.items.findIndex((x) => url.includes(x.route));
    }

    // REMOVEME - debug only
    log(msg) {
        console.log('%o \n %o : %o', msg, this.getRouterURL, this.items);
    }

    //#endregion
}
