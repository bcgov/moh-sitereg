import { browser } from 'protractor';
import { FakeDataDevUpdate } from './dev-update.data';
import { OrganizationPage } from './dev-update.po';
import { onPageLoadTest } from '../../generic-tests';

describe('IAM Dev Update - Organization Page', () => {
    let orgPage: OrganizationPage;
    const data = new FakeDataDevUpdate();
    let orgData;
    const REQUESTOR_PAGE_URL = `sitereg/update/identify`;
    const ORG_PAGE_URL = `sitereg/update/organization`;
    const SIGN_AUTH_PAGE_URL = `sitereg/update/signing-authority`;

    beforeEach(() => {
        orgPage = new OrganizationPage();
        orgData = data.organizationInfo();
        data.setSeed(123);
    });

    it('01. should load the page without issue', () => {
        orgPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(ORG_PAGE_URL);
        expect(orgPage.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

    it('02. should let the user to continue if there are no updates in Organization Info', () => {
        orgPage.navigateTo();
        orgPage.clickOption('false');
        orgPage.continue();
        expect(browser.getCurrentUrl()).toContain(SIGN_AUTH_PAGE_URL, 'should navigate to the next page');
    });

    it('03. should let the user to continue if they clicked Yes and filled out all required fields', () => {
        orgPage.navigateTo();
        orgPage.clickOption('true');
        orgPage.fillOrgInfo(orgData);
        orgPage.continue();
        expect(browser.getCurrentUrl()).toContain(SIGN_AUTH_PAGE_URL, 'should navigate to the next page');
    });

    it('04. should let the user select value from dropdown box instead of typing the text', () => {
        orgPage.navigateTo();
        orgPage.clickOption('true');
        orgPage.selectFromDropDown('province', 'British Columbia');
        orgPage.getInputVal('province').then(function(val){
            expect(val).toBe('British Columbia');
        });
        orgPage.scrollDown();
        orgPage.selectFromDropDown('The organization', 'Employees and International Students');
        orgPage.getInputVal('The organization').then(function(val){
             expect(val).toBe('Employees and International Students');
        });
    });

    it('05. should let the user to continue if they click Yes and leave the fields blank', () => {
        orgPage.navigateTo();
        orgPage.clickOption('true');
        orgPage.continue();
        expect(browser.getCurrentUrl()).toContain(SIGN_AUTH_PAGE_URL, 'should navigate to the next page');
    });

    it('06. should NOT let user to continue if they did not click either Yes or No', () => {
        orgPage.navigateTo();
        orgPage.continue();
        expect(browser.getCurrentUrl()).toContain(ORG_PAGE_URL, 'should stay on the same page');
    });

    it('07. should let user to go back to the previous page by clicking the stepper but NOT to move forward to the next page', () => {
        orgPage.navigateTo();
        orgPage.clickLink('span', 'Identify');
        expect(browser.getCurrentUrl()).toContain(REQUESTOR_PAGE_URL, 'should navigate to the previous page');
        orgPage.clickLink('span', 'Organization');
        expect(browser.getCurrentUrl()).toContain(REQUESTOR_PAGE_URL, 'should still be on the same page - EXPECT TO FAIL');
    });
});
