import { browser } from 'protractor';
import { FakeDataDevUpdate } from './update.data';
import { OrganizationPage, BaseDevUpdateTestPage } from './update.po';
import { onPageLoadTest, onClickStepperTest, onClickContinueTest } from './generic-tests';

describe('IAM Update - Organization Page', () => {
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

    onPageLoadTest(ORG_PAGE_URL);
    onClickStepperTest(ORG_PAGE_URL, REQUESTOR_PAGE_URL, 'Identify', 'Signing Authority');
    onClickContinueTest(ORG_PAGE_URL);

    it('01. should let the user to continue if there are no updates in Organization Info', () => {
        orgPage.navigateTo();
        orgPage.clickOption('false');
        orgPage.continue();
        expect(browser.getCurrentUrl()).toContain(SIGN_AUTH_PAGE_URL, 'should navigate to the next page');
    });

    it('02. should let the user to continue if they clicked Yes and filled out all required fields', () => {
        orgPage.navigateTo();
        orgPage.clickOption('true');
        orgPage.fillOrgInfo(orgData);
        orgPage.continue();
        expect(browser.getCurrentUrl()).toContain(SIGN_AUTH_PAGE_URL, 'should navigate to the next page');
    });

    it('03. should let the user select value from dropdown box instead of typing the text', () => {
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

    it('04. should let the user to continue if they click Yes and leave the fields blank', () => {
        orgPage.navigateTo();
        orgPage.clickOption('true');
        orgPage.continue();
        expect(browser.getCurrentUrl()).toContain(SIGN_AUTH_PAGE_URL, 'should navigate to the next page');
    });

});
