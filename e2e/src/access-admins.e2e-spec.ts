import { browser } from 'protractor';
import { FakeDataSiteReg } from './sitereg.data';
import { AccessAdminsPage } from './sitereg.po';
import { JSONDataSiteReg } from '../../e2e/run-with-data.js';

describe('Moh SiteReg - Access Admins Page', () => {
    let accessPage: AccessAdminsPage;
    const data = new FakeDataSiteReg();
    let accessData;
    const ACCESS_PAGE_URL = `register/access-admins`;
    const USERS_PAGE_URL = `register/users`;
    const jsonData = data.getJSONData();
    if (data.hasJsonData) { // Uses JSON data
        accessData = jsonData;
    }

    beforeAll(() => {
        if (data.hasJsonData === false) {
            console.log('START OF MOH-SITEREG E2E' + '\nThis test uses Seed #: ' + data.getSeed());
        }
    });

    beforeEach(() => {
        accessPage = new AccessAdminsPage();
        if (data.hasJsonData === false) {
            accessData = data.signingAuthorityInfo();
            data.setSeed();
        }
    });

    fit('01. should load the page without issue', () => {
        accessPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(ACCESS_PAGE_URL);
        expect(accessPage.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

    fit('02. should let user to continue without filling out any fields', () => {
        accessPage.navigateTo();
        accessPage.continue();
        expect(browser.getCurrentUrl()).toContain(USERS_PAGE_URL, 'should navigate to the Users page');
    });

    it('03. should let user to continue if all the required fields are filled out', () => {
        accessPage.navigateTo();
        accessPage.clickButton('btn btn-block');
        // accessPage.fillInfo(aaData);
        accessPage.fillInfo();
        accessPage.scrollDown();
        accessPage.selectValue('administeringFor', jsonData.administeringFor);
        browser.sleep(5000);
        accessPage.continue();
        expect(accessPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(USERS_PAGE_URL, 'should navigate to the Users page');
    });

    it('04. should let user to continue when user clicks the x button', () => {
        accessPage.navigateTo();
        accessPage.clickButton('btn btn-block');
        // accessPage.fillInfo(aaData);
        accessPage.fillInfo();
        accessPage.scrollDown();
        accessPage.selectValue('administeringFor', jsonData.administeringFor);
        accessPage.clickButton('btn delete');
        accessPage.continue();
        expect(accessPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(USERS_PAGE_URL, 'should navigate to the Users page');
    });

    // Additional Tests
    it('05. should delete correct admin if user adds two admins and deletes one of them', () => {
        accessPage.navigateTo();
        accessPage.clickButton('btn btn-block');
        // accessPage.fillInfo(aaData);
        accessPage.fillInfo();
        accessPage.scrollDown();
        accessPage.selectValue('administeringFor', jsonData.administeringFor);
        // accessPage.scrollUp();
        accessPage.clickButton('btn btn-block');
        // accessPage.fillInfo(aaData2);
        accessPage.fillInfo();
        accessPage.selectValue('administeringFor', jsonData.administeringFor);
        accessPage.scrollDown();
        accessPage.clickButton('btn delete'); // deletes the second admin created (latest one)
        accessPage.continue();
        expect(accessPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(USERS_PAGE_URL, 'should navigate to the Users page');
    });

    it('06. should NOT be able to continue with an incomplete admin section even if another admin is complete', () => {
        accessPage.navigateTo();
        accessPage.clickButton('btn btn-block');
        // accessPage.fillInfo(aaData);
        accessPage.fillInfo();
        accessPage.scrollDown();
        accessPage.selectValue('administeringFor', jsonData.administeringFor);
        accessPage.clickButton('btn btn-block');
        accessPage.fillInfo();
        accessPage.scrollDown();
        accessPage.continue();
        expect(browser.getCurrentUrl()).toContain(ACCESS_PAGE_URL);
    });

    // Test will fail since _autofill is still active in dev mode
    xit('07. should not be able to access "_autofill" dev only URL', () => {
        // accessPage.navigateTo();
        // expect(accessPage.getTextFromField()).toBe('', 'should be empty');
    });

});
