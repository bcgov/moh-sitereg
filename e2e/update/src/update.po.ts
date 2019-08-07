import { browser, by, element, WebElement, protractor, $$ } from 'protractor';
import { OrganizationPageTest, RequestorPageTest, SigningAuthorityPageTest, FakeDataDevUpdate } from './update.data';
import { GroupNumbersPageTest } from 'e2e/registration/src/sitereg.data';
import { BaseMSPTestPage } from '../../msp.po';
import { elementAt } from 'rxjs/operators';

export class BaseDevUpdateTestPage extends BaseMSPTestPage {

    protected data = new FakeDataDevUpdate();
    protected jsonData = this.data.getJSONData();
    protected jsonParam = this.jsonData.e2eParam;

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

    selectValue(label: string, value: string) {
        element.all(by.css(`select[ng-reflect-name="${label}"]`)).first().click(); // opens dropdown
        element.all(by.css(`select[ng-reflect-name="${label}"]`)).first().element(by.cssContainingText('option', `${value}`)).click();
    }

    /**
     * * Types the text inside the first input box
     */
    typeTextFirstOccurrence(labelId: string, text: string) {
        element.all(by.css(`input[ng-reflect-name^="${labelId}"]`)).first().sendKeys(text);
    }

    typeTextUsingIndex(val: string, index: number, text: string) {
        const idVal = val + index;
        element.all(by.css(`input[id^="${idVal}"]`)).first().sendKeys(text);
    }

    selectValueUsingIndex(val: string, index: number, text: string) {
        const idVal = val + index;
        element.all(by.css(`select[id="${idVal}"]`)).first().click(); // opens dropdown
        element.all(by.css(`select[id="${idVal}"]`)).first().element(by.cssContainingText('option', `${text}`)).click();
    }

    clickRadioButton(labelVal: string, forVal: string) {
        element.all(by.css(`common-radio[label^="${labelVal}"]`)).first().element(by.css(`label[for^="${forVal}"]`)).click();
    }

}

export class RequestorInfoPage extends BaseDevUpdateTestPage {

    navigateTo() {
        return browser.get('/sitereg/update/requestor');
    }

    fillPage(data?: RequestorPageTest) {
        if (data === undefined) {
            data = this.jsonData.requestorInfoPage;
        }
        this.typeText('organizationNumber', data.orgNum + '');
        this.typeText('emailAddress', data.email);
    }

}

export class OrganizationPage extends BaseDevUpdateTestPage {

    navigateTo() {
        return browser.get('/sitereg/update/organization');
    }

    fillPage(data?: OrganizationPageTest) {
        if (data === undefined) {
            data = this.jsonData.organizationPage;
        }
        this.clickOption(data.anyUpdates + '');
        if (data.anyUpdates){
            this.fillOrgInfo();
        }
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

    fillOrgInfo(data?: OrganizationPageTest) {
        if (data === undefined) {
            data = this.jsonData.organizationPage;
        }
        this.typeText('organizationName', data.orgName);
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

    protected data = this.jsonData.signingAuthorityPage;
    private index = 0;

    navigateTo() {
        return browser.get('/sitereg/update/signing-authority');
    }

    fillPage() {
        if (this.data.addSigningAuthority) {
            this.clickButton('btn', 'Add Signing Authority');
            this.fillAddSignAuth();
            this.scrollUp();
        }
        if (this.data.removeSigningAuthority) {
            this.clickButton('btn', 'Remove Signing Authority');
            this.fillRemoveSignAuth();
            this.scrollUp();
        }
        if (this.data.updateSigningAuthority) {
            this.clickButton('btn', 'Update Signing Authority');
            this.scrollDown();
            this.fillUpdateSignAuth();
        }
    }

    fillAddSignAuth() {
        const data = this.data.addSigningAuthority;
        if (data.title) {
            this.selectValueUsingIndex('userTitle_', this.index, data.title);
        }
        this.typeTextUsingIndex('firstName_', this.index, data.firstName);
        if (data.initial) {
            this.typeTextUsingIndex('initial_', this.index, data.initial);
        }
        this.typeTextUsingIndex('lastName_', this.index, data.lastName);
        this.typeTextUsingIndex('jobTitle_', this.index, data.jobTitle);
        this.typeTextUsingIndex('emailAddress_', this.index, data.email);
        this.typeTextUsingIndex('confirmEmail_', this.index, data.email);
        this.typeTextUsingIndex('phone_', this.index, data.mobile + '');
        this.typeTextUsingIndex('ext_', this.index, data.extension);
        this.typeTextUsingIndex('fax_', this.index, data.fax + '');
        this.clickRadioButton('Does the Signing Authority', data.accessToMSP + '');
        if (data.accessToMSP) {
            this.selectValueUsingIndex('administeringFor_add_', this.index, data.administeringFor);
        }
    }

    fillRemoveSignAuth() {
        const data = this.data.removeSigningAuthority;
        this.typeTextUsingIndex('emailAddress_remove_', this.index, data.signingAuthEmail);
        this.typeTextUsingIndex('ministryUserId_remove_', this.index, data.ministryUserID);
    }

    fillUpdateSignAuth() {
        const data = this.data.updateSigningAuthority;
        this.typeTextUsingIndex('forIdentifyEmailAddress_edit_', this.index, data.signingAuthEmail);
        this.typeTextUsingIndex('forIdentifyMinistryUserId_edit_', this.index, data.ministryUserID);
        if (data.title) {
            this.selectValueUsingIndex('userTitle_edit_', this.index, data.title);
        }
        this.typeTextUsingIndex('firstName_edit_', this.index, data.firstName);
        if (data.initial) {
            this.typeTextUsingIndex('initial_edit_', this.index, data.initial);
        }
        this.typeTextUsingIndex('lastName_edit_', this.index, data.lastName);
        this.typeTextUsingIndex('jobTitle_edit_', this.index, data.jobTitle);
        this.typeTextUsingIndex('emailAddress_edit_', this.index, data.email);
        this.typeTextUsingIndex('confirmEmail_edit_', this.index, data.email);
        this.typeTextUsingIndex('phone_edit_', this.index, data.mobile + '');
        this.typeTextUsingIndex('ext_edit_', this.index, data.extension);
        this.typeTextUsingIndex('fax_edit_', this.index, data.fax + '');
        this.clickRadioButton('Does you want to change', data.accessToMSP + '');
        if (data.accessToMSP) {
            this.selectValueUsingIndex('administeringFor_remove_', this.index, data.administeringFor);
        }
    }

    /*
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
    */

}

export class AccessAdminsPage extends SigningAuthorityPage {

    protected data = this.jsonData.accessAdminsPage;

    navigateTo() {
        return browser.get('/sitereg/update/access-admins');
    }

    fillPage() {
        if (this.data.addAccessAdmins) {
            for (let i = 0; i < this.data.addAccessAdmins.length; i++) {
                this.clickButton('btn', 'Add Access Administrator');
                this.fillAddAccessAdmin(i);
                this.scrollUp();
            }
        }
        if (this.data.removeAccessAdmins) {
            for (let i = 0; i < this.data.removeAccessAdmins.length; i++) {
                this.clickButton('btn', 'Remove Access Administrator');
                this.fillRemoveAccessAdmin(i);
                this.scrollUp();
            }
        }
        if (this.data.updateAccessAdmins) {
            for (let i = 0; i < this.data.updateAccessAdmins.length; i++) {
                this.clickButton('btn', 'Update Access Administrator');
                this.scrollDown();
                this.fillUpdateAccessAdmin(i);
            }
        }
    }

    fillAddAccessAdmin(index: number) {
        const data = this.data.addAccessAdmins;
        if (data[index].title) {
            this.selectValueUsingIndex('userTitle_', index, data[index].title);
        }
        this.typeTextUsingIndex('firstName_', index, data[index].firstName);
        if (data[index].initial) {
            this.typeTextUsingIndex('initial_', index, data[index].initial);
        }
        this.typeTextUsingIndex('lastName_', index, data[index].lastName);
        this.typeTextUsingIndex('jobTitle_', index, data[index].jobTitle);
        this.typeTextUsingIndex('emailAddress_', index, data[index].email);
        this.typeTextUsingIndex('confirmEmail_', index, data[index].email);
        this.typeTextUsingIndex('phone_', index, data[index].mobile + '');
        this.typeTextUsingIndex('ext_', index, data[index].extension);
        this.typeTextUsingIndex('fax_', index, data[index].fax + '');
        this.selectValueUsingIndex('administeringFor_', index, data[index].administeringFor);
    }

    fillRemoveAccessAdmin(index: number) {
        const data = this.data.removeAccessAdmins;
        this.typeTextUsingIndex('emailAddress_remove_', index, data[index].signingAuthEmail);
        this.typeTextUsingIndex('ministryUserId_remove_', index, data[index].ministryUserID);
    }

    fillUpdateAccessAdmin(index: number) {
        const data = this.data.updateAccessAdmins;
        this.typeTextUsingIndex('forIdentifyEmailAddress_edit_', index, data[index].signingAuthEmail);
        this.typeTextUsingIndex('forIdentifyMinistryUserId_edit_', index, data[index].ministryUserID);
        if (data[index].title) {
            this.selectValueUsingIndex('userTitle_edit_', index, data[index].title);
        }
        this.typeTextUsingIndex('firstName_edit_', index, data[index].firstName);
        if (data[index].initial) {
            this.typeTextUsingIndex('initial_edit_', index, data[index].initial);
        }
        this.typeTextUsingIndex('lastName_edit_', index, data[index].lastName);
        this.typeTextUsingIndex('jobTitle_edit_', index, data[index].jobTitle);
        this.typeTextUsingIndex('emailAddress_edit_', index, data[index].email);
        this.typeTextUsingIndex('confirmEmail_edit_', index, data[index].email);
        this.typeTextUsingIndex('phone_edit_', index, data[index].mobile + '');
        this.typeTextUsingIndex('ext_edit_', index, data[index].extension);
        this.typeTextUsingIndex('fax_edit_', index, data[index].fax + '');
        this.selectValueUsingIndex('changeRole_edit_', index, data[index].changeRole);
        this.clickRadioButton('Do you want to change', data[index].changeAccess + '');
        if (data[index].changeAccess) {
            this.selectValueUsingIndex('administeringFor_edit_', index, data[index].administeringFor);
        }
    }

}

export class UsersPage extends SigningAuthorityPage {

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

