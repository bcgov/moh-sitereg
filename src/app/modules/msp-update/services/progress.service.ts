import { Injectable } from '@angular/core';
import {
    Router,
    UrlTree,
    UrlSegmentGroup,
    PRIMARY_OUTLET,
    UrlSegment,
} from '@angular/router';
import { ROUTES_UPDATE } from '../routing/routes.constants';
import { CheckCompleteBaseService, PageListInterface } from 'moh-common-lib';
import { environment } from '../../../../environments/environment';


export interface MspProgressItem extends PageListInterface {
  order: number;
}
@Injectable({
    providedIn: 'root',
})
export class MspDirectUpdateProgressService extends CheckCompleteBaseService {
    //#region properties

    public enableConfirmation = false;

    //#endregion

    constructor(protected router: Router) {
      super(router);
    }

    //#region Methods


    /**
     * Updats ordered steps to complete registeration
     */
    getUpdateItems() {
      // Set values
      // this.bypassGuards = environment.bypassGuards;
      this.startUrl = ROUTES_UPDATE.REQUESTOR.fullpath;

      this.pageCheckList = Object.values(ROUTES_UPDATE).map((routeInfo) => {
          return {
              order: routeInfo.order,
              route: routeInfo.path,
              isComplete: false,
          };
      });
      console.log(`%c %o`, 'color:green', this.pageCheckList);
    }

    /**
     * validates is next component url route is ordered or not
     */
    moveNext(currentUrl: string, nextUrl: string): boolean {
        const cUrl = this.getLastSegmentOfUrl(currentUrl);
        const nUrl = this.getLastSegmentOfUrl(nextUrl);

        const current = this.getProgressItem(cUrl) as MspProgressItem;
        const next: MspProgressItem = this.getProgressItem(nUrl) as MspProgressItem;

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
     * returns Progress Item { order, path, title } based on provided url
     * todo: instead of include use exact
     * @param url component route url
     */
    private getProgressItem(url: string): PageListInterface | null {
        const index = this.pageCheckList.findIndex((x) => url.includes(x.route));
        return index > -1 ? this.pageCheckList[index] : null;
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

    // REMOVEME - debug only
    log(msg) {
        console.log('%o \n %o : %o', msg, this.getLastSegmentOfUrl(this.router.url), this.pageCheckList);
    }

    //#endregion
}

