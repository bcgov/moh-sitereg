import { browser, by, element, WebElement, protractor, $$ } from 'protractor';
import { AbstractTestPage } from 'moh-common-lib/e2e';
import { OrganizationPageTest, SigningAuthorityPageTest, GroupNumbersPageTest, FakeDataSiteReg } from './sitereg.data';

export class BaseSiteRegTestPage extends AbstractTestPage {

    protected data = new FakeDataSiteReg();
    protected jsonData = this.data.getJSONData();

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
        element.all(by.css(`select[ng-reflect-name="${label}"]`)).first().click(); // opens dropdown
        element.all(by.css(`select[ng-reflect-name="${label}"] option[ng-reflect-value="${value}"]`)).first().click();
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

    /**
     * * Every page will overload this method to fill out the data
     */
    fillPage() {

    }

    clickOptionJSON(labelVal: string, ngVal: string) {
        const selector = `input[formcontrolname="${labelVal}"][ng-reflect-value="${ngVal}"]`;
        if (ngVal === 'true') {
            ngVal = 'Yes';
        } else {
            ngVal = 'No';
        }
        element(by.css(selector)).element(by.xpath('..')).element(by.cssContainingText('label', `${ngVal}`)).click();
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

    fillPage() {
        const json = this.jsonData.organizationPage;
        this.agreeConsentModal();
        this.clickConsentModalContinue();
        this.fillOrgName();
        this.fillAddress();
        this.selectValue('administeringFor', json.administeringFor);
        this.scrollDown();
        this.clickOptionJSON('thirdParty', json.thirdParty.toString());
        this.fillOrgNum();
        this.clickOptionJSON('blueCross', json.blueCross.toString());
        this.continue();
    }

    fillOrgName(data?: OrganizationPageTest) {
        let info = data;
        if (data === undefined) {
            info = this.jsonData.organizationPage;
        }
        this.typeText('name', info.orgName);
    }

    fillAddress(data?: OrganizationPageTest) {
        let info = data;
        if (data === undefined) {
            info = this.jsonData.organizationPage;
        }
        if (info.suiteNo) {
            this.typeText('suite', info.suiteNo + '');
        }
        this.typeTextFirstOccurrence('street', info.streetNo + '');
        this.typeText('streetName', info.streetName);
        if (info.streetAddressLine) {
            this.typeText('addressLine2', info.streetAddressLine);
        }
        this.typeText('city', info.city);
        this.selectValue('province', this.province[this.num]);
        this.typeText('postalCode', info.postal);
    }

    fillOrgNum(data?: OrganizationPageTest) {
        let info = data;
        if (data === undefined) {
            info = this.jsonData.organizationPage;
        }
        this.typeText('organizationNumber', info.orgNum + '');
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

    fillPage() {
        const json = this.jsonData.signingAuthorityPage;
        this.selectValue('userTitle', json.title);
        this.fillInfo(0);
        this.scrollDown();
        this.selectValue('administeringFor', json.administeringFor);
        this.clickOptionJSON('directMspAccess', json.directMspAccess.toString());
        this.continue();
    }

    fillInfo(i: number, data?: SigningAuthorityPageTest) {
        let info = data;
        if (data === undefined) {
            info = this.jsonData.accessAdminsPage;
        }
        this.typeTextFirstOccurrence('firstName', info[i].firstName);
        this.typeTextFirstOccurrence('lastName', info[i].lastName);
        this.typeTextFirstOccurrence('jobTitle', info[i].jobTitle);
        this.typeTextFirstOccurrence('emailAddress', info[i].email);
        this.typeTextFirstOccurrence('confirmEmail', info[i].email);
        this.typeTextFirstOccurrence('phone', info[i].mobile + '');
        this.typeTextFirstOccurrence('ext', info[i].extension + '');
        this.typeTextFirstOccurrence('fax', info[i].fax + '');
    }

}

export class AccessAdminsPage extends SigningAuthorityPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/register/access-admins');
    }

    fillPage() {
        const json = this.jsonData.usersPage;
        for (let i = 1; i < json.length; i++) { // starts with 1 because the first admin is already filled out
            this.clickButton('btn btn-block');
            this.fillInfo(i);
            this.selectValue('administeringFor', json[i].administeringFor);
            this.scrollUp();
        }
        this.continue();
    }

}

export class UsersPage extends SigningAuthorityPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/register/users');
    }

    fillPage() {
        const json = this.jsonData.usersPage;
        for (let i = 0; i < json.length; i++) {
            this.clickButton('btn btn-block');
            this.fillInfo(i);
            this.selectValue('administeringFor', json[i].administeringFor);
            this.scrollUp();
        }
        this.continue();
    }

}

export class GroupNumbersPage extends BaseSiteRegTestPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/register/group-numbers');
    }

    fillPage() {
        const json = this.jsonData.groupNumbersPage;
        for (let i = 0; i < json.length; i++) {
            this.fillGroupNum(i);
            this.scrollUp();
            if (i !== json.length - 1){
                this.clickButton('btn-block');
            }
        }
        this.continue();
    }

    fillGroupNum(i: number, data?: GroupNumbersPageTest) {
        let info = data;
        if (data === undefined) {
            info = this.jsonData.groupNumbersPage;
        }
        this.typeTextFirstOccurrence('groupNumber', info[i].groupNum + '');
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

    fillPage() {
        this.scrollDown();
        this.agreeTermsAndConditions();
        this.typeCaptcha();
        this.continue();
    }

    agreeTermsAndConditions() {
        element(by.css('input[id="consent"]')).click();
    }

    typeCaptcha() {
        element(by.css('input[id="answer"]')).sendKeys('irobot');
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
