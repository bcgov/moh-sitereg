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
        element.all(by.css(`select[ng-reflect-name="${label}"]`)).first().element(by.cssContainingText('option', `${value}`)).click();
    }

    selectAdministeringFor(label: string, value: string) {
        element.all(by.css(`select[ng-reflect-name="${label}"]`)).first().element(by.css(`option[value="${value}"]`)).click();
    }

    clickButton(value: string) {
        element.all(by.css(`button[class*="${value}"]`)).first().click();
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
        element.all(by.css(selector)).first().element(by.xpath('..')).element(by.cssContainingText('label', `${ngVal}`)).click();
    }
    

}

export class OrganizationPage extends BaseSiteRegTestPage {

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
        this.selectAdministeringFor('administeringFor', json.administeringFor);
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
        if (info.streetNo !== undefined) {
            this.typeTextFirstOccurrence('street', info.streetNo + '');
        }
        this.typeText('streetName', info.streetName);
        if (info.streetAddressLine) {
            this.typeText('addressLine2', info.streetAddressLine);
        }
        this.typeText('city', info.city);
        this.selectValue('province', info.province);
        this.typeText('postalCode', info.postal);
    }

    fillOrgNum(data?: OrganizationPageTest) {
        if (data === undefined) {
            data = this.jsonData.organizationPage;
        }
        if (data.thirdParty) {
            this.typeText('organizationNumber', data.orgNum + '');
        }
        this.selectAdministeringFor('administeringFor', 'Employees');
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
        this.fillInfo(0);
        this.scrollDown();
        this.selectAdministeringFor('administeringFor', json.administeringFor);
        this.clickOptionJSON('directMspAccess', json.directMspAccess.toString());
        this.continue();
    }

    fillInfo(i: number, data?: SigningAuthorityPageTest) {
        if (data === undefined) {
            data = this.jsonData.signingAuthorityPage;
        }
        if (data.title) {
            this.selectValue('userTitle', data.title);
        }
        this.typeTextFirstOccurrence('firstName', data.firstName);
        if (data.initial) {
            this.typeTextFirstOccurrence('initial', data.initial);
        }
        this.typeTextFirstOccurrence('lastName', data.lastName);
        this.typeTextFirstOccurrence('jobTitle', data.jobTitle);
        this.typeTextFirstOccurrence('emailAddress', data.email);
        this.typeTextFirstOccurrence('confirmEmail', data.confirmEmail);
        this.typeTextFirstOccurrence('phone', data.mobile + '');
        if (data.extension) {
            this.typeTextFirstOccurrence('ext', data.extension + '');
        }
        if (data.fax) {
            this.typeTextFirstOccurrence('fax', data.fax + '');
        }
    }

    checkEmailAddress(idVal: string) {
        return element(by.css(`input[id^=${idVal}]`)).getAttribute('value');
    }

}

export class AccessAdminsPage extends BaseSiteRegTestPage {

    constructor() {
        super();
    }

    navigateTo() {
        return browser.get('/register/access-admins');
    }

    fillPage() {
        const json = this.jsonData.accessAdminsPage;
        if (this.jsonData.signingAuthorityPage.directMspAccess) {
            this.clickButton('btn delete');
        }
        for (let i = 0; i < json.length; i++) {
            this.clickButton('btn btn-block');
            this.fillInfo(i);
            this.scrollDown();
            this.selectAdministeringFor('administeringFor', json[i].administeringFor);
            this.scrollUp();
        }
        this.continue();
    }

    fillInfo(i: number, data?: SigningAuthorityPageTest) {
        if (data === undefined) {
            data = this.jsonData.accessAdminsPage;
            if (data[i].title) {
                this.selectValue('userTitle', data[i].title);
            }
            this.typeTextFirstOccurrence('firstName', data[i].firstName);
            if (data[i].initial) {
                this.typeTextFirstOccurrence('initial', data[i].initial);
            }
            this.typeTextFirstOccurrence('lastName', data[i].lastName);
            this.typeTextFirstOccurrence('jobTitle', data[i].jobTitle);
            this.typeTextFirstOccurrence('emailAddress', data[i].email);
            this.typeTextFirstOccurrence('confirmEmail', data[i].confirmEmail);
            this.typeTextFirstOccurrence('phone', data[i].mobile + '');
            if (data[i].extension) {
                this.typeTextFirstOccurrence('ext', data[i].extension + '');
            }
            if (data[i].fax) {
                this.typeTextFirstOccurrence('fax', data[i].fax + '');
            }
        } else {
            if (data.title) {
                this.selectValue('userTitle', data.title);
            }
            this.typeTextFirstOccurrence('firstName', data.firstName);
            if (data.initial) {
                this.typeTextFirstOccurrence('initial', data.initial);
            }
            this.typeTextFirstOccurrence('lastName', data.lastName);
            this.typeTextFirstOccurrence('jobTitle', data.jobTitle);
            this.typeTextFirstOccurrence('emailAddress', data.email);
            this.typeTextFirstOccurrence('confirmEmail', data.confirmEmail);
            this.typeTextFirstOccurrence('phone', data.mobile + '');
            if (data.extension) {
                this.typeTextFirstOccurrence('ext', data.extension + '');
            }
            if (data.fax) {
                this.typeTextFirstOccurrence('fax', data.fax + '');
            }
        }
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
        if (this.jsonData.usersPage !== undefined){
            const json = this.jsonData.usersPage;
            for (let i = 0; i < json.length; i++) {
                this.clickButton('btn btn-block');
                this.fillInfo(i);
                this.scrollDown();
                this.selectAdministeringFor('administeringFor', json[i].administeringFor);
                this.scrollUp();
            }
        }
        this.continue();
    }

    fillInfo(i: number, data?: SigningAuthorityPageTest) {
        if (data === undefined) {
            data = this.jsonData.usersPage;
            if (data[i].title) {
                this.selectValue('userTitle', data[i].title);
            }
            this.typeTextFirstOccurrence('firstName', data[i].firstName);
            if (data[i].initial) {
                this.typeTextFirstOccurrence('initial', data[i].initial);
            }
            this.typeTextFirstOccurrence('lastName', data[i].lastName);
            this.typeTextFirstOccurrence('jobTitle', data[i].jobTitle);
            this.typeTextFirstOccurrence('emailAddress', data[i].email);
            this.typeTextFirstOccurrence('confirmEmail', data[i].confirmEmail);
            this.typeTextFirstOccurrence('phone', data[i].mobile + '');
            if (data[i].extension) {
                this.typeTextFirstOccurrence('ext', data[i].extension + '');
            }
            if (data[i].fax) {
                this.typeTextFirstOccurrence('fax', data[i].fax + '');
            }
        } else {
            if (data.title) {
                this.selectValue('userTitle', data.title);
            }
            this.typeTextFirstOccurrence('firstName', data.firstName);
            if (data.initial) {
                this.typeTextFirstOccurrence('initial', data.initial);
            }
            this.typeTextFirstOccurrence('lastName', data.lastName);
            this.typeTextFirstOccurrence('jobTitle', data.jobTitle);
            this.typeTextFirstOccurrence('emailAddress', data.email);
            this.typeTextFirstOccurrence('confirmEmail', data.confirmEmail);
            this.typeTextFirstOccurrence('phone', data.mobile + '');
            if (data.extension) {
                this.typeTextFirstOccurrence('ext', data.extension + '');
            }
            if (data.fax) {
                this.typeTextFirstOccurrence('fax', data.fax + '');
            }
        }
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
        if (data === undefined) {
            data = this.jsonData.groupNumbersPage;
            this.typeTextFirstOccurrence('groupNumber', data[i].groupNum + '');
            if (this.jsonData.organizationPage.thirdParty) {
                this.clickOptionJSON('thirdParty', data[i].thirdParty.toString());
            }
        } else {
            this.typeTextFirstOccurrence('groupNumber', data.groupNum + '');
        }
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
