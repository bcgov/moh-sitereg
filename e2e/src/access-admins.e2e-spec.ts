import { browser } from 'protractor';
import { FakeDataSiteReg } from './sitereg.data';
import { AccessAdminsPage } from './sitereg.po';

describe('Moh SiteReg - Access Admins Page', () => {
    let aaPage: AccessAdminsPage;
    const data = new FakeDataSiteReg();
    let aaData;
    let aaData2;
    const AA_PAGE_URL = `msp-registration/access-admins`;
    const USERS_PAGE_URL = `msp-registration/users`;

    beforeEach(() => {
        aaPage = new AccessAdminsPage();
        aaData = data.signingAuthorityInfo();
        data.setSeed(123);
    });

    it('01. should load the page without issue', () => {
        aaPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(AA_PAGE_URL);
        expect(aaPage.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

    it('02. should let user to continue without filling out any fields', () => {
        aaPage.navigateTo();
        aaPage.continue();
        expect(browser.getCurrentUrl()).toContain(USERS_PAGE_URL, 'should navigate to the Users page');
    });

    it('03. should let user to continue if all the required fields are filled out', () => {
        aaPage.navigateTo();
        aaPage.clickButton('btn btn-block', ' Add New Access Admin ');
        aaPage.fillInfo(aaData);
        aaPage.scrollDown();
        aaPage.selectValue('administeringFor', 'Employees');
        aaPage.continue();
        expect(aaPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(USERS_PAGE_URL, 'should navigate to the Users page');
    });

    it('04. should let user to continue when user clicks the x button', () => {
        aaPage.navigateTo();
        aaPage.clickButton('btn btn-block', ' Add New Access Admin ');
        aaPage.fillInfo(aaData);
        aaPage.scrollDown();
        aaPage.selectValue('administeringFor', 'Employees');
        aaPage.clickButton('btn delete', '');
        aaPage.continue();
        expect(aaPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(USERS_PAGE_URL, 'should navigate to the Users page');
    });

    // Additional Tests
    it('05. should delete correct admin if user adds two admins and deletes one of them', () => {
        aaData2 = data.signingAuthorityInfo();
        aaPage.navigateTo();
        aaPage.clickButton('btn btn-block', ' Add New Access Admin ');
        aaPage.fillInfo(aaData);
        aaPage.scrollDown();
        aaPage.selectValue('administeringFor', 'Employees');
        aaPage.clickButton('btn btn-block', ' Add New Access Admin ');
        aaPage.fillInfo(aaData2);
        aaPage.selectValue('administeringFor', 'Employees');
        aaPage.scrollDown();
        aaPage.clickButton('btn delete', ''); // deletes the second admin created (latest one)
        aaPage.continue();
        expect(aaPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(USERS_PAGE_URL, 'should navigate to the Users page');
    });

    it('06. should NOT be able to continue with an incomplete admin section even if another admin is complete', () => {
        aaData.lastName = '';
        aaPage.navigateTo();
        aaPage.clickButton('btn btn-block', ' Add New Access Admin ');
        aaPage.fillInfo(aaData);
        aaPage.scrollDown();
        aaPage.selectValue('administeringFor', 'Employees');
        aaPage.continue();
        expect(browser.getCurrentUrl()).toContain(AA_PAGE_URL);
    });

});
