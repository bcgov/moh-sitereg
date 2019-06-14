import { browser, by, element, WebElement, protractor, $$ } from 'protractor';
import { AbstractTestPage } from 'moh-common-lib/e2e';
import { OrganizationPageTest, SigningAuthorityPageTest, GroupNumbersPageTest } from './sitereg.data';

export class BaseSiteRegTestPage extends AbstractTestPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/');
    }

    clickOption(value: string) {
        element(by.css(`label[for="${value}"]`)).click();
    }

    selectValue(label: string, value: string) {
        element(by.css(`select[ng-reflect-name="${label}"]`)).click(); // opens dropdown
        element(by.css(`select[ng-reflect-name="${label}"] option[ng-reflect-value="${value}"]`)).click();
    }

    clickButton(value: string) {
        element(by.css(`button[class*="${value}"]`)).click();
    }

    // TODO: Move these methods to shared lib
    /**
     * * Clicks the checkbox which means the user agrees with the info collection notice.
     * InfoColectionNoticeComponent <common-collection-modal>
     */
    agreeConsentModal() {
        element(by.css('label[for="agree"]')).element(by.css('strong')).click();
    }

    /**
     * * Clicks continue inside the modal
     * InfoColectionNoticeComponent <common-collection-modal>
     */
    clickConsentModalContinue() {
        element(by.css('div[class="modal-footer"]')).element(by.css('button[type="submit"]')).click();
    }

    /**
     * * Checks if the modal is currently displayed or not 
     */
    checkConsentModal() {
        return element(by.css('common-consent-modal')).element(by.css('div[aria-labelledby="myLargeModalLabel"]')).isDisplayed();
    }

    /**
     * * Scrolls up to the top of the page
     */
    scrollUp() {
        browser.executeScript('window.scrollTo(0,0)');
    }

    /**
     * * Types the text inside the first input box
     */
    typeTextFirstOccurrence(labelId: string, text: string) {
        element.all(by.css(`input[ng-reflect-name^="${labelId}"]`)).first().sendKeys(text);
    }

    /**
     * * Clicks the link based from the label and text provided
     */
    clickLink(label: string, text: string) {
        element(by.cssContainingText(label, text)).click();
    }

    /**
     * * Counts the number of options inside a dropdown object
     */
    countLength(label: string){
        return $$(`select[ng-reflect-name^="${label}"] option`);
    }

}

export class OrganizationPage extends BaseSiteRegTestPage {

    private province: string[] = ['AB', 'BC', 'MB', 'NB', 'NL', 'NS', 'ON', 'PE', 'QC', 'SK', 'NT', 'NU', 'YT'];
    private num: number = Math.floor(Math.random() * Math.floor(this.province.length));

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/register/organization');
    }

    fillOrgName(data: OrganizationPageTest) {
        this.typeText('name', data.orgName);
    }

    fillAddress(data: OrganizationPageTest) {
        if (data.suiteNo) {
            this.typeText('suite', data.suiteNo + '');
        }
        this.typeTextFirstOccurrence('street', data.streetNo + '');
        this.typeText('streetName', data.streetName);
        if (data.streetAddressLine) {
            this.typeText('addressLine2', data.streetAddressLine);
        }
        this.typeText('city', data.city);
        this.selectValue('province', this.province[this.num]);
        this.typeText('postalCode', data.postal);
    }

    fillOrgNum(data: OrganizationPageTest) {
        this.typeText('organizationNumber', data.orgNum + '');
        this.selectValue('administeringFor', 'Employees');
    }

}

export class SigningAuthorityPage extends BaseSiteRegTestPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/register/signing-authority');
    }

    fillInfo(data: SigningAuthorityPageTest) {
        this.typeTextFirstOccurrence('firstName', data.firstName);
        this.typeTextFirstOccurrence('lastName', data.lastName);
        this.typeTextFirstOccurrence('jobTitle', data.jobTitle);
        this.typeTextFirstOccurrence('emailAddress', data.email);
        this.typeTextFirstOccurrence('confirmEmail', data.email);
        this.typeTextFirstOccurrence('phone', data.mobile + '');
        this.typeTextFirstOccurrence('ext', data.extension + '');
        this.typeTextFirstOccurrence('fax', data.fax + '');
    }

}

export class AccessAdminsPage extends SigningAuthorityPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/register/access-admins');
    }

}

export class UsersPage extends SigningAuthorityPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/register/users');
    }

}

export class GroupNumbersPage extends BaseSiteRegTestPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/register/group-numbers');
    }

    fillGroupNum(data: GroupNumbersPageTest) {
        this.typeText('groupNumber', data.groupNum + '');
    }
}

export class ReviewPage extends BaseSiteRegTestPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/register/review');
    }

}

export class AuthorizePage extends BaseSiteRegTestPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/register/authorize');
    }

}

export class SpecialCasePage extends BaseSiteRegTestPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/register/_autofill');
    }

    getTextFromField() {
        return (element(by.css('input[ng-reflect-name="name"]')).getText());
    }

}
