import { browser, by, element, WebElement, protractor, $$ } from 'protractor';
import { AbstractTestPage } from 'moh-common-lib/e2e';
import { OrganizationPageTest } from './dev-update.data';

export class BaseDevUpdateTestPage extends AbstractTestPage {

    navigateTo() {
        return browser.get('/sitereg/home/');
    }

    // TODO: Move the methods below to shared lib
    clickOption(value: string) {
        element(by.css(`label[for="${value}"]`)).click();
    }

    selectValue(label: string, value: string) {
        element(by.css(`select[ng-reflect-name="${label}"]`)).click(); // opens dropdown
        element(by.css(`select[ng-reflect-name="${label}"] option[ng-reflect-value="${value}"]`)).click();
    }

}

export class OrganizationPage extends BaseDevUpdateTestPage {

    private province: string[] = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT'];
    private num: number = Math.floor(Math.random() * Math.floor(this.province.length));

    navigateTo() {
        return browser.get('/sitereg/update/organization');
    }

    fillPage() {

    }

    fillOrgInfo(data: OrganizationPageTest) {
        this.typeText('name', data.orgName);
        if (data.suiteNo) {
            this.typeText('suite', data.suiteNo + ' ');
        }
        this.typeText('street', data.streetNo + ' ');
        this.typeText('streetName', data.streetName);
        if (data.streetAddressLine) {
            this.typeText('addressLine2', data.streetAddressLine);
        }
        this.typeText('city', data.city);
        this.selectValue('province', this.province[this.num]);
        this.typeText('postalCode', data.postal);
        this.selectValue('administeringFor', 'Employees');
    }

}
