import { browser, by, element, WebElement, protractor, $$ } from 'protractor';
import { AbstractTestPage } from 'moh-common-lib/e2e';
import { OrganizationPageTest, RequestorPageTest } from './update.data';

export class BaseDevUpdateTestPage extends AbstractTestPage {

    navigateTo() {
        return browser.get('/sitereg/home/');
    }

    // TODO: Move the methods below to shared lib
    clickOption(value: string) {
        element(by.css(`label[for^="${value}"]`)).click();
    }

}

export class RequestorInfoPage extends BaseDevUpdateTestPage {

    navigateTo() {
        return browser.get('/sitereg/update/identify');
    }

    fillPage(data: RequestorPageTest) {
        this.typeText('organizationNumber', data.orgNum + '');
        this.typeText('emailAddress', data.email);
    }

}

export class OrganizationPage extends BaseDevUpdateTestPage {

    navigateTo() {
        return browser.get('/sitereg/update/organization');
    }

    fillPage() {

    }

    typeTextUsingPlaceHolder(placeholder: string, data: string) {
        element(by.css(`input[placeholder="${placeholder}"]`)).sendKeys(data);
    }

    typeTextUsingID(id: string, data: string) {
        element(by.css(`input[id^="${id}"]`)).sendKeys(data);
        element(by.css(`input[id^="${id}"]`)).sendKeys(protractor.Key.ENTER);
    }

    selectFromDropDown(id: string, value: string) {
        element(by.css(`input[id^="${id}"]`)).click();
        element(by.cssContainingText('span', value)).click();
    }

    getInputVal(id: string) {
        const selector = `ng-select[ng-reflect-label-for-id*="${id}"]`;
        return element(by.css(selector)).element(by.css('span[class="ng-value-label"]')).getText();
    }

    fillOrgInfo(data: OrganizationPageTest) {
        this.typeText('name', data.orgName);
        if (data.suiteNo) {
            this.typeText('suite', data.suiteNo + '');
        }
        this.typeText('street', data.streetNo + '');
        this.typeTextUsingPlaceHolder('Street Name', data.streetName);
        if (data.streetAddressLine) {
            this.typeText('addressLine2', data.streetAddressLine);
        }
        this.typeTextUsingID('city', data.city);
        this.typeTextUsingID('province', 'British Columbia');
        this.typeTextUsingID('postalCode', data.postal);
        this.typeTextUsingID('The organization', 'Employees');
    }

}
