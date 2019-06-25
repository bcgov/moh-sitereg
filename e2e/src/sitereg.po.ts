import { browser, by, element, WebElement, protractor, $$ } from 'protractor';
import { SiteRegTestPage } from './app.po';
import { OrganizationPageTest, SigningAuthorityPageTest, GroupNumbersPageTest } from './sitereg.data';

export class BaseSiteRegTestPage extends SiteRegTestPage {

    constructor() {
        super();
    }

    clickOption(value: string) {
        element(by.css(`label[for="${value}"]`)).click();
    }

    selectValue(label: string, value: string) {
        element(by.css(`select[ng-reflect-name="${label}"]`)).click(); // opens dropdown
        element(by.css(`select[ng-reflect-name="${label}"] option[ng-reflect-value="${value}"]`)).click();
    }
}

export class OrganizationPage extends BaseSiteRegTestPage {

    private province: string[] = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT'];
    private num: number = Math.floor(Math.random() * Math.floor(this.province.length));

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/msp-registration/organization');
    }

    fillOrgName(data: OrganizationPageTest) {
        this.typeText('name', data.orgName);
    }

    fillAddress(data: OrganizationPageTest) {
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
    }

    fillOrgNum(data: OrganizationPageTest) {
        this.typeText('organizationNumber', data.orgNum + ' ');
        this.selectValue('administeringFor', 'Employees');
    }

}

export class SigningAuthorityPage extends BaseSiteRegTestPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/msp-registration/signing-authority');
    }

    fillInfo(data: SigningAuthorityPageTest) {
        this.typeText('firstName', data.firstName);
        this.typeText('lastName', data.lastName);
        this.typeText('jobTitle', data.jobTitle);
        this.typeText('emailAddress', data.email);
        this.typeText('confirmEmail', data.email);
        this.typeText('phone', data.mobile + '');
        this.typeText('ext', data.extension + '');
        this.typeText('fax', data.fax + '');
    }
}

export class AccessAdminsPage extends SigningAuthorityPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/msp-registration/access-admins');
    }

}

export class UsersPage extends SigningAuthorityPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/msp-registration/users');
    }

}

export class GroupNumbersPage extends BaseSiteRegTestPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/msp-registration/group-numbers');
    }

    fillGroupNum(data: GroupNumbersPageTest) {
        this.typeText('groupNumber', data.groupNum + '');
    }
}

export class AuthorizePage extends BaseSiteRegTestPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/msp-registration/authorize');
    }

}