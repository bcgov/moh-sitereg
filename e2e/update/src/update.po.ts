import { browser, by, element, WebElement, protractor, $$ } from 'protractor';
import { OrganizationPageTest, RequestorPageTest, SigningAuthorityPageTest, FakeDataDevUpdate } from './update.data';
import { GroupNumbersPageTest } from 'e2e/registration/src/sitereg.data';
import { BaseMSPTestPage } from '../../msp.po';

export class BaseDevUpdateTestPage extends BaseMSPTestPage {

    protected data = new FakeDataDevUpdate();
    protected jsonData = this.data.getJSONData();

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

    typeTextUsingID(idVal: string, text: string) {
        element.all(by.css(`input[id^="${idVal}"]`)).first().sendKeys(text);
    }

    selectValueUsingID(idVal: string, text: string) {
        element.all(by.css(`select[id^="${idVal}"]`)).first().click(); // opens dropdown
        element.all(by.css(`select[id^="${idVal}"]`)).first().element(by.cssContainingText('option', `${text}`)).click();
    }

    selectProvinceUsingID(text: string) {
        element.all(by.css(`input[id^="province"]`)).first().click();
        element.all(by.css(`common-province`)).first().element(by.cssContainingText('span', `${text}`)).click();
    }

    clickRadioButton(labelVal: string, forVal: string) {
        element.all(by.css(`common-radio[label^="${labelVal}"]`)).first().element(by.css(`label[for^="${forVal}"]`)).click();
    }

}

export class RequestorInfoPage extends BaseDevUpdateTestPage {

    navigateTo() {
        return browser.get('/sitereg/update/requestor');
    }

    async fillPage(data?: RequestorPageTest) {
        if (data === undefined) {
            data = this.jsonData.requestorInfoPage;
        }
        this.typeText('organizationNumber', data.orgNum + '');
        this.typeText('emailAddress', data.email);
        await console.log('EMAIL: ' + data.email);
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
        if (data.anyUpdates) {
            this.fillOrgInfo();
        }
    }

    typeTextUsingPlaceHolder(placeholder: string, data: string) {
        element(by.css(`input[placeholder="${placeholder}"]`)).sendKeys(data);
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
        this.selectProvinceUsingID(data.province);
        this.typeTextUsingID('postalCode', data.postal);
        this.selectValueUsingID('administeringFor', data.administeringFor);
    }

}

export class SigningAuthorityPage extends BaseDevUpdateTestPage {

    protected data = this.jsonData.signingAuthorityPage;
    private index = 0;

    navigateTo() {
        return browser.get('/sitereg/update/signing-authority');
    }

    fillPage() {
        if (this.data) {
            if (this.data.updateSigningAuthority) {
                this.clickButton('btn', 'Update Signing Authority');
                this.fillUpdateSignAuth();
                this.scrollUp();
            }
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
        }
    }

    fillAddSignAuth() {
        const data = this.data.addSigningAuthority;
        if (data.title) {
            this.selectValueUsingID('userTitle_0', data.title);
        }
        this.typeTextUsingID('firstName_0', data.firstName);
        if (data.initial) {
            this.typeTextUsingID('initial_0', data.initial);
        }
        this.typeTextUsingID('lastName_0', data.lastName);
        this.typeTextUsingID('jobTitle_0', data.jobTitle);
        this.typeTextUsingID('emailAddress_0', data.email);
        this.typeTextUsingID('confirmEmail_0', data.confirmEmail);
        this.typeTextUsingID('phone_0', data.mobile + '');
        if (data.extension) {
            this.typeTextUsingID('ext_0', data.extension);
        }
        if (data.fax) {
            this.typeTextUsingID('fax_0', data.fax + '');
        }
        this.scrollDown();
        this.clickRadioButton('Does the Signing Authority', data.accessToMSP + '');
        if (data.accessToMSP) {
            this.selectValueUsingID('administeringFor_add_0', data.administeringFor);
        }
    }

    fillRemoveSignAuth() {
        const data = this.data.removeSigningAuthority;
        this.typeTextUsingID('emailAddress_remove_0', data.signingAuthEmail);
        if (data.ministryUserID) {
            this.typeTextUsingID('ministryUserId_remove_0', data.ministryUserID);
        }
    }

    fillUpdateSignAuth() {
        const data = this.data.updateSigningAuthority;
        this.typeTextUsingID('forIdentifyEmailAddress_edit_0', data.signingAuthEmail);
        if (data.ministryUserID) {
            this.typeTextUsingID('forIdentifyMinistryUserId_edit_0', data.ministryUserID);
        }
        if (data.title) {
            this.selectValueUsingID('userTitle_edit_0', data.title);
        }
        if (data.firstName) {
            this.typeTextUsingID('firstName_edit_0', data.firstName);
        }
        if (data.initial) {
            this.typeTextUsingID('initial_edit_0', data.initial);
        }
        if (data.lastName) {
            this.typeTextUsingID('lastName_edit_0', data.lastName);
        }
        if (data.jobTitle) {
            this.typeTextUsingID('jobTitle_edit_0', data.jobTitle);
        }
        this.scrollDown();
        if (data.email) {
            this.typeTextUsingID('emailAddress_edit_0', data.email);
        }
        if (data.confirmEmail) {
            this.typeTextUsingID('confirmEmail_edit_0', data.confirmEmail);
        }
        if (data.mobile) {
            this.typeTextUsingID('phone_edit_0', data.mobile + '');
        }
        if (data.extension) {
            this.typeTextUsingID('ext_edit_0', data.extension);
        }
        if (data.fax) {
            this.typeTextUsingID('fax_edit_0', data.fax + '');
        }
        this.clickRadioButton('Does the Signing Authority', data.accessToMSP + '');
        if (data.accessToMSP) {
            this.selectValueUsingID('administeringFor_remove_0', data.administeringFor);
        }
    }
}

export class AccessAdminsPage extends SigningAuthorityPage {

    protected data = this.jsonData.accessAdminsPage;

    navigateTo() {
        return browser.get('/sitereg/update/access-admins');
    }

    fillPage() {
        if (this.data) {
            if (this.data.updateAccessAdmins) {
                for (let i = 0; i < this.data.updateAccessAdmins.length; i++) {
                    this.clickButton('btn', 'Update Access Administrator');
                    this.fillUpdateAccessAdmin(i);
                    this.scrollUp();
                }
            }
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
        }
    }

    fillAddAccessAdmin(index: number) {
        const data = this.data.addAccessAdmins;
        if (data[index].title) {
            this.selectValueUsingID('userTitle_0', data[index].title);
        }
        this.typeTextUsingID('firstName_0', data[index].firstName);
        if (data[index].initial) {
            this.typeTextUsingID('initial_0', data[index].initial);
        }
        this.typeTextUsingID('lastName_0', data[index].lastName);
        this.typeTextUsingID('jobTitle_0', data[index].jobTitle);
        this.typeTextUsingID('emailAddress_0', data[index].email);
        this.typeTextUsingID('confirmEmail_0', data[index].confirmEmail);
        this.typeTextUsingID('phone_0', data[index].mobile + '');
        if (data[index].extension) {
            this.typeTextUsingID('ext_0', data[index].extension);
        }
        if (data[index].fax) {
            this.typeTextUsingID('fax_0', data[index].fax + '');
        }
        this.scrollDown();
        this.selectValueUsingID('administeringFor_0', data[index].administeringFor);
    }

    fillRemoveAccessAdmin(index: number) {
        const data = this.data.removeAccessAdmins;
        this.typeTextUsingID('emailAddress_remove_0', data[index].signingAuthEmail);
        if (data[index].ministryUserID) {
            this.typeTextUsingID('ministryUserId_remove_0', data[index].ministryUserID);
        }
    }

    fillUpdateAccessAdmin(index: number) {
        const data = this.data.updateAccessAdmins;
        this.typeTextUsingID('forIdentifyEmailAddress_edit_0', data[index].signingAuthEmail);
        if (data[index].ministryUserID) {
            this.typeTextUsingID('forIdentifyMinistryUserId_edit_0', data[index].ministryUserID);
        }
        this.scrollDown();
        if (data[index].title) {
            this.selectValueUsingID('userTitle_edit_0', data[index].title);
        }
        if (data[index].firstName) {
            this.typeTextUsingID('firstName_edit_0', data[index].firstName);
        }
        if (data[index].initial) {
            this.typeTextUsingID('initial_edit_0', data[index].initial);
        }
        if (data[index].lastName) {
            this.typeTextUsingID('lastName_edit_0', data[index].lastName);
        }
        if (data[index].jobTitle) {
            this.typeTextUsingID('jobTitle_edit_0', data[index].jobTitle);
        }
        if (data[index].email) {
            this.typeTextUsingID('emailAddress_edit_0', data[index].email);
        }
        if (data[index].confirmEmail) {
            this.typeTextUsingID('confirmEmail_edit_0', data[index].confirmEmail);
        }
        if (data[index].mobile) {
            this.typeTextUsingID('phone_edit_0', data[index].mobile + '');
        }
        if (data[index].extension) {
            this.typeTextUsingID('ext_edit_0', data[index].extension);
        }
        if (data[index].fax) {
            this.typeTextUsingID('fax_edit_0', data[index].fax + '');
        }
        this.selectValueUsingID('changeRole_edit_0', data[index].changeRole);
        this.clickRadioButton('Do you want to change', data[index].changeAccess + '');
        if (data[index].changeAccess) {
            this.selectValueUsingID('administeringFor_edit_0', data[index].administeringFor);
        }
    }

}

export class UsersPage extends SigningAuthorityPage {

    protected data = this.jsonData.usersPage;

    navigateTo() {
        return browser.get('/sitereg/update/users');
    }

    fillPage() {
        if (this.data) {
            if (this.data.updateUsers) {
                for (let i = 0; i < this.data.updateUsers.length; i++) {
                    this.clickButton('btn', 'Update User');
                    this.fillUpdateUser(i);
                    this.scrollUp();
                }
            }
            if (this.data.addUsers) {
                for (let i = 0; i < this.data.addUsers.length; i++) {
                    this.clickButton('btn', 'Add User');
                    this.fillAddUser(i);
                    this.scrollUp();
                }
            }
            if (this.data.removeUsers) {
                for (let i = 0; i < this.data.removeUsers.length; i++) {
                    this.clickButton('btn', 'Remove User');
                    this.fillRemoveUser(i);
                    this.scrollUp();
                }
            }
        }
    }

    fillAddUser(index: number) {
        const data = this.data.addUsers;
        if (data[index].title) {
            this.selectValueUsingID('userTitle_0', data[index].title);
        }
        this.typeTextUsingID('firstName_0', data[index].firstName);
        if (data[index].initial) {
            this.typeTextUsingID('initial_0', data[index].initial);
        }
        this.typeTextUsingID('lastName_0', data[index].lastName);
        this.typeTextUsingID('jobTitle_0', data[index].jobTitle);
        this.typeTextUsingID('emailAddress_0', data[index].email);
        this.typeTextUsingID('confirmEmail_0', data[index].confirmEmail);
        this.typeTextUsingID('phone_0', data[index].mobile + '');
        if (data[index].extension) {
            this.typeTextUsingID('ext_0', data[index].extension);
        }
        if (data[index].fax) {
            this.typeTextUsingID('fax_0', data[index].fax + '');
        }
        this.scrollDown();
        this.selectValueUsingID('administeringFor_0', data[index].administeringFor);
    }

    fillRemoveUser(index: number) {
        const data = this.data.removeUsers;
        this.typeTextUsingID('emailAddress_remove_0', data[index].signingAuthEmail);
        if (data[index].ministryUserID) {
            this.typeTextUsingID('ministryUserId_remove_0', data[index].ministryUserID);
        }
    }

    fillUpdateUser(index: number) {
        const data = this.data.updateUsers;
        this.typeTextUsingID('forIdentifyEmailAddress_edit_0', data[index].signingAuthEmail);
        if (data[index].ministryUserID) {
            this.typeTextUsingID('forIdentifyMinistryUserId_edit_0', data[index].ministryUserID);
        }
        this.scrollDown();
        if (data[index].title) {
            this.selectValueUsingID('userTitle_edit_0', data[index].title);
        }
        if (data[index].firstName) {
            this.typeTextUsingID('firstName_edit_0', data[index].firstName);
        }
        if (data[index].initial) {
            this.typeTextUsingID('initial_edit_0', data[index].initial);
        }
        if (data[index].lastName) {
            this.typeTextUsingID('lastName_edit_0', data[index].lastName);
        }
        if (data[index].jobTitle) {
            this.typeTextUsingID('jobTitle_edit_0', data[index].jobTitle);
        }
        if (data[index].email) {
            this.typeTextUsingID('emailAddress_edit_0', data[index].email);
        }
        if (data[index].confirmEmail) {
            this.typeTextUsingID('confirmEmail_edit_0', data[index].confirmEmail);
        }
        if (data[index].mobile) {
            this.typeTextUsingID('phone_edit_0', data[index].mobile + '');
        }
        if (data[index].extension) {
            this.typeTextUsingID('ext_edit_0', data[index].extension);
        }
        if (data[index].fax) {
            this.typeTextUsingID('fax_edit_0', data[index].fax + '');
        }
        this.selectValueUsingID('changeRole_edit_0', data[index].changeRole);
        this.clickRadioButton('Do you want to change', data[index].changeAccess + '');
        if (data[index].changeAccess) {
            this.selectValueUsingID('administeringFor_edit_0', data[index].administeringFor);
        }
    }

}

export class GroupNumbersPage extends BaseDevUpdateTestPage {

    protected data = this.jsonData.groupNumbersPage;

    navigateTo() {
        return browser.get('/sitereg/update/group-numbers');
    }

    fillPage() {
        if (this.data) {
            if (this.data.updateMSPGroup) {
                for (let i = 0; i < this.data.updateMSPGroup.length; i++) {
                    this.clickButton('btn', 'Update administration of MSP Group');
                    this.fillUpdateMSPGroup(i);
                    this.scrollUp();
                }
            }
            if (this.data.addMSPGroup) {
                for (let i = 0; i < this.data.addMSPGroup.length; i++) {
                    this.clickButton('btn', 'Add a new MSP Group');
                    this.fillAddMSPGroup(i);
                    this.scrollUp();
                }
            }
            if (this.data.removeMSPGroup) {
                for (let i = 0; i < this.data.removeMSPGroup.length; i++) {
                    this.clickButton('btn', 'Remove MSP Group');
                    this.fillRemoveMSPGroup(i);
                    this.scrollUp();
                }
            }
        }
    }

    checkAddThirdParty(index: number) {
        if (this.data.addMSPGroup[index].groupNum === true) {
            return 'Y';
        } else {
            return 'N';
        }
    }

    checkUpdateThirdParty(index: number) {
        if (this.data.updateMSPGroup[index].groupNum === true) {
            return 'Y';
        } else {
            return 'N';
        }
    }

    fillAddMSPGroup(index: number) {
        const data = this.data.addMSPGroup;
        this.typeTextUsingID('groupNo_0', data[index].groupNum);
        this.clickRadioButton('Will this group be', this.checkAddThirdParty(index));
    }

    fillRemoveMSPGroup(index: number) {
        const data = this.data.removeMSPGroup;
        this.typeTextUsingID('groupNo_remove_0', data[index].groupNum);
    }

    fillUpdateMSPGroup(index: number) {
        const data = this.data.updateMSPGroup;
        this.typeTextUsingID('groupNo_edit_0', data[index].groupNum);
        this.clickRadioButton('Will this group be', this.checkUpdateThirdParty(index));
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

