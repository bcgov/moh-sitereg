import { AbstractTestPage } from 'moh-common-lib/e2e';
import { browser, element, by, protractor } from 'protractor';

export class BaseMSPTestPage extends AbstractTestPage {

    navigateTo() {

    }

     // TODO: move to shared lib all the methods below
    /**
     * Navigate to the page given a specific URL
     */
    navigateToURL(PAGE_URL: string) {
        return browser.get('/' + PAGE_URL);
    }

}