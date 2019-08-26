import { browser, by, element, WebElement, protractor, $$ } from 'protractor';
import { AbstractTestPage } from 'moh-common-lib/e2e';
import { OrganizationPageTest, SigningAuthorityPageTest, GroupNumbersPageTest, FakeDataSiteReg } from './sitereg.data';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

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

    selectValueUsingID(label: string, value: string) {
        element.all(by.css(`select[id*="${label}"]`)).first().click(); // opens dropdown
        element.all(by.css(`select[id*="${label}"]`)).first().element(by.cssContainingText('option', `${value}`)).click();
    }

    selectAdministeringFor(label: string, value: string) {
        element.all(by.css(`select[ng-reflect-name="${label}"]`)).first().element(by.css(`option[value="${value}"]`)).click();
    }

    selectAdministeringForUsingID(label: string, value: string) {
        element.all(by.css(`select[id*="${label}"]`)).first().element(by.css(`option[value="${value}"]`)).click();
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
     * * Types the text inside the first input box using ID attribute
     */
    typeTextUsingID(labelId: string, text: string) {
        element.all(by.css(`input[id^="${labelId}"]`)).first().sendKeys(text);
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

    selectThirdParty(labelVal: string, ngVal: string) {
        let idVal;
        if (ngVal === 'true') {
            idVal = 'thirdPartyTrue';
            ngVal = 'Yes';
        } else {
            idVal = 'thirdPartyFalse';
            ngVal = 'No';
        }
        const selector = `input[id="${idVal}"]`;
        element.all(by.css(selector)).first().element(by.xpath('..')).element(by.cssContainingText('label', `${ngVal}`)).click();
    }

    selectAccessMSPDirect(labelVal: string, ngVal: string) {
        let idVal;
        if (ngVal === 'true') {
            idVal = 'aatrue';
            ngVal = 'Yes';
        } else {
            idVal = 'aafalse';
            ngVal = 'No';
        }
        const selector = `input[formcontrolname="${labelVal}"][id="${idVal}"]`;
        element.all(by.css(selector)).first().element(by.xpath('..')).element(by.cssContainingText('label', `${ngVal}`)).click();
    }

    selectRequireAccess(labelVal: string, ngVal: string) {
        let idVal;
        if (ngVal === 'true') {
            idVal = 'bctrue';
            ngVal = 'Yes';
        } else {
            idVal = 'bcfalse';
            ngVal = 'No';
        }
        const selector = `input[formcontrolname="${labelVal}"][id="${idVal}"]`;
        element.all(by.css(selector)).first().element(by.xpath('..')).element(by.cssContainingText('label', `${ngVal}`)).click();
    }

    selectThirdPartyGroupNum(labelVal: string, ngVal: string, index: number) {
        let idVal;
        if (ngVal === 'true') {
            idVal = 'bctrue__' + index;
            ngVal = 'Yes';
        } else {
            idVal = 'bcfalse' + index;
            ngVal = 'No';
        }
        const selector = `input[formcontrolname="thirdParty"][id*="${idVal}"]`;
        element.all(by.css(selector)).first().element(by.xpath('..')).element(by.cssContainingText('label', `${ngVal}`)).click();
    }

    getSnapshotLoc() {
        const jsonParam = this.jsonData.e2eParam;
        if (jsonParam.folderLocation) {
            return jsonParam.folderLocation;
        } else {
            return 'e2e/snapshots';
        }
    }

    pageSnapshot(page: string) {
        browser.sleep(3000);
        const fs = require('fs');
        const loc = this.getSnapshotLoc();
        // screenShotUtils.takeScreenshot({
        //     saveTo: "fullpageScreenshot.png"
        // });
        browser.takeScreenshot().then(data => {
            // const currentDate = new Date();
            // page = page + ' ' + currentDate.toString();
            const stream = fs.createWriteStream(`${loc}/${page}`);
            stream.write(new Buffer(data, 'base64'));
            stream.end();
        });
    }

    checkSnapshot(pageName: string, pageNum: number) {
        if (this.jsonData.e2eParam){
            const jsonParam = this.jsonData.e2eParam;
            if (jsonParam.snapshotAt !== undefined) {
                const snapshot = jsonParam.snapshotAt;
                for (let i = 0; i < snapshot.length; i++) {
                    if (snapshot[i] === pageNum) {
                        this.pageSnapshot(pageName);
                    }
                }
            } else {
                this.pageSnapshot(pageName);
            }
        }
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
        this.selectAdministeringForUsingID('administeringFor', json.administeringFor);
        this.scrollDown();
        this.selectThirdParty('thirdParty', json.thirdParty.toString());
        this.fillOrgNum();
        this.selectAccessMSPDirect('blueCross', json.blueCross.toString());
        this.checkSnapshot('Organization', 1);
        this.continue();
    }

    fillOrgName(data?: OrganizationPageTest) {
        let info = data;
        if (data === undefined) {
            info = this.jsonData.organizationPage;
        }
        this.typeTextUsingID('name', info.orgName);
    }

    fillAddress(data?: OrganizationPageTest) {
        let info = data;
        if (data === undefined) {
            info = this.jsonData.organizationPage;
        }
        if (info.suiteNo) {
            this.typeTextUsingID('suite', info.suiteNo + '');
        }
        if (info.streetNo !== undefined) {
            this.typeTextUsingID('street', info.streetNo + '');
        }
        this.typeTextUsingID('streetName', info.streetName);
        if (info.streetAddressLine) {
            this.typeTextUsingID('addressLine2', info.streetAddressLine);
        }
        this.typeTextUsingID('city', info.city);
        this.selectValueUsingID('province', info.province);
        this.typeTextUsingID('postalCode', info.postal);
    }

    fillOrgNum(data?: OrganizationPageTest) {
        if (data === undefined) {
            data = this.jsonData.organizationPage;
        }
        if (data.thirdParty) {
            this.typeTextUsingID('organizationNumber', data.orgNum + '');
        }
        this.selectAdministeringForUsingID('administeringFor', 'Employees');
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
        this.selectAdministeringForUsingID('administeringFor', json.administeringFor);
        this.selectRequireAccess('directMspAccess', json.directMspAccess.toString());
        this.checkSnapshot('Signing Authority', 2);
        this.continue();
    }

    fillInfo(i: number, data?: SigningAuthorityPageTest) {
        if (data === undefined) {
            data = this.jsonData.signingAuthorityPage;
        }
        if (data.title) {
            this.selectValueUsingID('userTitle', data.title);
        }
        this.typeTextUsingID('firstName', data.firstName);
        if (data.initial) {
            this.typeTextUsingID('initial', data.initial);
        }
        this.typeTextUsingID('lastName', data.lastName);
        this.typeTextUsingID('jobTitle', data.jobTitle);
        this.typeTextUsingID('emailAddress', data.email);
        this.typeTextUsingID('confirmEmail', data.confirmEmail);
        this.typeTextUsingID('phone', data.mobile + '');
        if (data.extension) {
            this.typeTextUsingID('ext', data.extension + '');
        }
        if (data.fax) {
            this.typeTextUsingID('fax', data.fax + '');
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
            this.clickButton('close');
        }
        for (let i = 0; i < json.length; i++) {
            this.clickButton('btn btn-block');
            this.fillInfo(i);
            // this.scrollDown();
            this.selectAdministeringForUsingID('administeringFor', json[i].administeringFor);
            this.checkSnapshot('Access Admin #' + (i + 1), 3);
            this.scrollUp();
        }
        this.continue();
    }

    fillInfo(i: number, data?: SigningAuthorityPageTest) {
        if (data === undefined) {
            data = this.jsonData.accessAdminsPage;
            if (data[i].title) {
                this.selectValueUsingID('userTitle', data[i].title);
            }
            this.typeTextUsingID('firstName', data[i].firstName);
            if (data[i].initial) {
                this.typeTextUsingID('initial', data[i].initial);
            }
            this.typeTextUsingID('lastName', data[i].lastName);
            this.typeTextUsingID('jobTitle', data[i].jobTitle);
            this.typeTextUsingID('emailAddress', data[i].email);
            this.typeTextUsingID('confirmEmail', data[i].confirmEmail);
            this.typeTextUsingID('phone', data[i].mobile + '');
            if (data[i].extension) {
                this.typeTextUsingID('ext', data[i].extension + '');
            }
            if (data[i].fax) {
                this.typeTextUsingID('fax', data[i].fax + '');
            }
        } else {
            if (data.title) {
                this.selectValueUsingID('userTitle', data.title);
            }
            this.typeTextUsingID('firstName', data.firstName);
            if (data.initial) {
                this.typeTextUsingID('initial', data.initial);
            }
            this.typeTextUsingID('lastName', data.lastName);
            this.typeTextUsingID('jobTitle', data.jobTitle);
            this.typeTextUsingID('emailAddress', data.email);
            this.typeTextUsingID('confirmEmail', data.confirmEmail);
            this.typeTextUsingID('phone', data.mobile + '');
            if (data.extension) {
                this.typeTextUsingID('ext', data.extension + '');
            }
            if (data.fax) {
                this.typeTextUsingID('fax', data.fax + '');
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
                // this.scrollDown();
                this.selectAdministeringForUsingID('administeringFor', json[i].administeringFor);
                this.checkSnapshot('User #' + (i + 1), 4);
                this.scrollUp();
            }
        }
        this.continue();
    }

    fillInfo(i: number, data?: SigningAuthorityPageTest) {
        if (data === undefined) {
            data = this.jsonData.usersPage;
            if (data[i].title) {
                this.selectValueUsingID('userTitle', data[i].title);
            }
            this.typeTextUsingID('firstName', data[i].firstName);
            if (data[i].initial) {
                this.typeTextUsingID('initial', data[i].initial);
            }
            this.typeTextUsingID('lastName', data[i].lastName);
            this.typeTextUsingID('jobTitle', data[i].jobTitle);
            this.typeTextUsingID('emailAddress', data[i].email);
            this.typeTextUsingID('confirmEmail', data[i].confirmEmail);
            this.typeTextUsingID('phone', data[i].mobile + '');
            if (data[i].extension) {
                this.typeTextUsingID('ext', data[i].extension + '');
            }
            if (data[i].fax) {
                this.typeTextUsingID('fax', data[i].fax + '');
            }
        } else {
            if (data.title) {
                this.selectValueUsingID('userTitle', data.title);
            }
            this.typeTextUsingID('firstName', data.firstName);
            if (data.initial) {
                this.typeTextUsingID('initial', data.initial);
            }
            this.typeTextUsingID('lastName', data.lastName);
            this.typeTextUsingID('jobTitle', data.jobTitle);
            this.typeTextUsingID('emailAddress', data.email);
            this.typeTextUsingID('confirmEmail', data.confirmEmail);
            this.typeTextUsingID('phone', data.mobile + '');
            if (data.extension) {
                this.typeTextUsingID('ext', data.extension + '');
            }
            if (data.fax) {
                this.typeTextUsingID('fax', data.fax + '');
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
            this.checkSnapshot('Group Number #' + (i + 1), 5);
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
            this.typeTextUsingID('groupNumber', data[i].groupNum + '');
            if (this.jsonData.organizationPage.thirdParty) {
                this.selectThirdPartyGroupNum('thirdParty', data[i].thirdParty.toString(), i);
            }
        } else {
            this.typeTextUsingID('groupNumber', data.groupNum + '');
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
