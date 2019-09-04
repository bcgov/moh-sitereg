
import { browser, element, by, protractor } from 'protractor';
import { AbstractTestPage } from 'moh-common-lib/e2e';

export class BaseMSPTestPage extends AbstractTestPage {

    navigateTo() {

    }

    fillConsentModal(PAGE_URL: string){
        this.navigateToURL(PAGE_URL);
        this.agreeConsentModal();
        this.clickConsentModalContinue();
    }

     // TODO: move to shared lib all the methods below
    /**
     * Navigate to the page given a specific URL
     */
    navigateToURL(PAGE_URL: string) {
        return browser.get('/' + PAGE_URL);
    }

    pageScreenshot() {
        const fs = require('fs');
        browser.takeScreenshot().then(data => {
            const stream = fs.createWriteStream('e2e/test.png');
            stream.write(new Buffer(data, 'base64'));
            stream.end();
        });
    }

}