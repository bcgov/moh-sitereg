import { browser } from 'protractor';
import { FakeDataSiteReg } from './sitereg.data';
import { UsersPage } from './sitereg.po';

describe('Moh SiteReg - Users Page', () => {
    let usersPage: UsersPage;
    const data = new FakeDataSiteReg();
    let usersData;
    let usersData2;
    const USERS_PAGE_URL = `register/users`;
    const GROUP_PAGE_URL = `register/group-numbers`;

    afterAll(() => {
        console.log('END OF E2E ENROLMENT' + '\nThis test uses Seed #: ' + data.getSeed());
    });

    beforeEach(() => {
        usersPage = new UsersPage();
        usersData = data.signingAuthorityInfo();
        data.setSeed();
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
        usersPage.clickButton('btn btn-block');
        usersPage.fillInfo(usersData);
        usersPage.scrollDown();
        usersPage.selectValue('administeringFor', 'Employees');
        usersPage.continue();
        expect(usersPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL, 'should navigate to the Users page');
    });

    it('04. should let user to continue when user clicks the x button', () => {
        usersPage.navigateTo();
        usersPage.clickButton('btn btn-block');
        usersPage.fillInfo(usersData);
        usersPage.scrollDown();
        usersPage.selectValue('administeringFor', 'Employees');
        usersPage.clickButton('btn delete');
        usersPage.continue();
        expect(usersPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL, 'should navigate to the Group Numbers page');
    });

    // Additional Tests
    it('05. should delete correct admin if user adds two admins and deletes one of them', () => {
        usersData2 = data.signingAuthorityInfo();
        usersPage.navigateTo();
        usersPage.clickButton('btn btn-block');
        usersPage.fillInfo(usersData);
        usersPage.scrollDown();
        usersPage.selectValue('administeringFor', 'Employees');
        usersPage.clickButton('btn btn-block');
        usersPage.fillInfo(usersData);
        usersPage.selectValue('administeringFor', 'Employees');
        usersPage.scrollDown();
        usersPage.clickButton('btn delete'); // deletes the second admin created (latest one)
        usersPage.continue();
        expect(usersPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL, 'should navigate to the Group Numbers page');
    });

    it('06. should NOT be able to continue with an incomplete user section even if another admin is complete', () => {
        usersPage.navigateTo();
        usersPage.clickButton('btn btn-block');
        usersPage.fillInfo(usersData);
        usersPage.scrollDown();
        usersPage.selectValue('administeringFor', 'Employees');
        usersPage.clickButton('btn btn-block');
        usersPage.fillInfo(usersData);
        usersPage.scrollDown();
        usersPage.continue();
        expect(browser.getCurrentUrl()).toContain(USERS_PAGE_URL);
    });

});

