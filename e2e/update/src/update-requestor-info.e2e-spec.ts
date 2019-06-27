import { browser } from 'protractor';
import { FakeDataDevUpdate } from './update.data';
import { RequestorInfoPage } from './update.po';

describe('IAM Update - Requestor Info Page', () => {
    let requestorPage: RequestorInfoPage;
    const data = new FakeDataDevUpdate();
    let requestorData;
    const REQUESTOR_PAGE_URL = `sitereg/update/identify`;
    const ORG_PAGE_URL = `sitereg/update/organization`;

    beforeEach(() => {
        requestorPage = new RequestorInfoPage();
        requestorData = data.requestorInfo();
        data.setSeed(123);
    });

    it('01. should load the page without issue', () => {
        requestorPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(REQUESTOR_PAGE_URL);
        expect(requestorPage.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

    it('02. should NOT let user to continue if they did not fill out both fields', () => {
        requestorPage.navigateTo();
        requestorPage.continue();
        expect(browser.getCurrentUrl()).toContain(REQUESTOR_PAGE_URL);
    });

    it('03. should NOT let user to continue if the inputs are wrong/invalidated', () => {
        requestorData.orgNum = '1234567';
        requestorData.email = 'sample@email';
        requestorPage.navigateTo();
        requestorPage.fillPage(requestorData);
        requestorPage.continue();
        expect(browser.getCurrentUrl()).toContain(REQUESTOR_PAGE_URL);
    });

    it('04. should let user to continue if the inputs are correct', () => {
        requestorPage.navigateTo();
        requestorPage.fillPage(requestorData);
        requestorPage.continue();
        expect(browser.getCurrentUrl()).toContain(ORG_PAGE_URL);
    });

    it('05. should NOT let user continue by clicking the stepper', () => {
        requestorPage.navigateTo();
        requestorPage.clickLink('span', 'Organization');
        expect(browser.getCurrentUrl()).toContain(REQUESTOR_PAGE_URL, 'should still be on the same page - EXPECT TO FAIL');
    });

});
