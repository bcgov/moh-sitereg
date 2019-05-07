import { browser } from 'protractor';
import { FakeDataSiteReg } from './sitereg.data';
import { UsersPage } from './sitereg.po';

describe('Moh SiteReg - Users Page', () => {
    let usersPage: UsersPage;
    const data = new FakeDataSiteReg();
    let usersData;
    const USERS_PAGE_URL = `msp-registration/users`;
    const GROUP_PAGE_URL = `msp-registration/group-numbers`;

    beforeEach(() => {
        usersPage = new UsersPage();
        usersData = data.signingAuthorityInfo();
        data.setSeed(123);
    });

    it('01. should load the page without issue', () => {
        usersPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(USERS_PAGE_URL);
        expect(usersPage.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

    it('02. should let user to continue without filling out any fields', () => {
        usersPage.navigateTo();
        usersPage.continue();
        expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL, 'should navigate to the Users page');
    });

    it('03. should let user to continue if all the required fields are filled out', () => {
        usersPage.navigateTo();
        usersPage.clickButton('btn btn-block', ' Add New User ');
        usersPage.fillInfo(usersData);
        usersPage.scrollDown();
        usersPage.selectValue('administeringFor', 'Employees');
        usersPage.continue();
        expect(usersPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL, 'should navigate to the Users page');
    });

    it('04. should let user to continue when user clicks the x button', () => {
        usersPage.navigateTo();
        usersPage.clickButton('btn btn-block', ' Add New User ');
        usersPage.fillInfo(usersData);
        usersPage.scrollDown();
        usersPage.selectValue('administeringFor', 'Employees');
        usersPage.clickButton('btn delete', '');
        usersPage.continue();
        expect(usersPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL, 'should navigate to the Users page');
    });

});

