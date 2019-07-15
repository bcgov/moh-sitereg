import { browser, by, element, WebElement, protractor, $$ } from 'protractor';
import { AbstractTestPage } from 'moh-common-lib/e2e';
import { OrganizationPageTest, RequestorPageTest, SigningAuthorityPageTest } from './update.data';
import { GroupNumbersPageTest } from 'e2e/registration/src/sitereg.data';

export class BaseDevUpdateTestPage extends AbstractTestPage {

    navigateTo() {
        return browser.get('/sitereg/home/');
    }

    navigateToURL(PAGE_URL: string) {
        return browser.get('/' + PAGE_URL);
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
        this.continue();
    }

}

export class OrganizationPage extends BaseDevUpdateTestPage {

    navigateTo() {
        return browser.get('/sitereg/update/organization');
    }

    fillPage(data: OrganizationPageTest) {
        this.clickOption('true');
        this.fillOrgInfo(data);
        this.continue();

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

export class SigningAuthorityPage extends BaseDevUpdateTestPage {

    navigateTo() {
        return browser.get('/sitereg/update/signing-authority');
    }

    fillPage(data: SigningAuthorityPageTest) {
        this.clickButton('btn', 'Add Signing Authority');
        this.fillSignAuthInfo(data);
        this.scrollDown();
        this.clickOption('bcfalse');
        browser.sleep(5000);
        this.continue();
    }

    fillSignAuthInfo(data: SigningAuthorityPageTest) {
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

export class AccessAdminsPage extends BaseDevUpdateTestPage {

    navigateTo() {
        return browser.get('/sitereg/update/access-admins');
    }

}

export class UsersPage extends BaseDevUpdateTestPage {

    navigateTo() {
        return browser.get('/sitereg/update/users');
    }

}

export class GroupNumbersPage extends BaseDevUpdateTestPage {

    navigateTo() {
        return browser.get('/sitereg/update/group-numbers');
    }

    fillPage(data: GroupNumbersPageTest) {
        this.clickButton('btn', 'Add MSP Group');
        this.typeGroupNumber('Add new MSP Group #1', 'goupNo_0', data);
        this.checkThirdPartyAdmin('goupNo_0', 'Will this group', 'Yes');
        this.continue();
    }

    checkThirdPartyAdmin(ngVal: string, labelVal: string, text: string) {
        const sel = `sitereg-msp-group-no[ng-reflect-labelfor-id="${ngVal}"]`;
        const sel2 = `common-radio[label^="${labelVal}"]`;
        element(by.css(sel)).element(by.xpath('..')).element(by.css(sel2)).element(by.cssContainingText('label', text)).click();
    }

    typeGroupNumber(h4Val: string, ngVal: string, data: GroupNumbersPageTest) {
        const sel = `sitereg-msp-group-no[ng-reflect-labelfor-id="${ngVal}"]`;
        element(by.cssContainingText('h4', `${h4Val}`)).element(by.xpath('..')).element(by.css(sel)).element(by.css('input')).sendKeys(data.groupNum + '');
    }

    checkInputDisplayed(h4Val: string, ngVal: string) {
        const sel = `sitereg-msp-group-no[ng-reflect-labelfor-id="${ngVal}"]`;
        return element(by.cssContainingText('h4', `${h4Val}`)).element(by.xpath('..')).element(by.css(sel)).element(by.css('input')).getAttribute('value');
    }

    clickXIcon(h4Val: string) {
        element(by.cssContainingText('h4', `${h4Val}`)).element(by.xpath('..')).element(by.css('button')).click();
    }

    checkTextDisplayed(h4Val: string) {
        return element(by.cssContainingText('h4', `${h4Val}`)).isPresent();
    }

}

export class ReviewPage extends BaseDevUpdateTestPage {

    navigateTo() {
        return browser.get('/sitereg/update/review');
    }

}

export class SubmitPage extends BaseDevUpdateTestPage {

    navigateTo() {
        return browser.get('/sitereg/update/group-numbers');
    }

    typeCaptcha() {
        element(by.css('input[id="answer"]')).sendKeys('irobot');
    }
    
}

