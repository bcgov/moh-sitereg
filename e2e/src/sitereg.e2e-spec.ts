import { browser } from 'protractor';
import { FakeDataSiteReg } from './sitereg.data';
import { SigningAuthorityPage, OrganizationPage, AccessAdminsPage, UsersPage, GroupNumbersPage, AuthorizePage } from './sitereg.po';

fdescribe('BCSC Enrollment - End to End', () => {
    let orgPage: OrganizationPage;
    let saPage: SigningAuthorityPage;
    let aaPage: AccessAdminsPage;
    let usersPage: UsersPage;
    let groupPage: GroupNumbersPage;
    let authPage: AuthorizePage;
    const data = new FakeDataSiteReg();
    let orgData;
    let saData;
    let groupData;

    beforeEach(() => {
        orgPage = new OrganizationPage();
        saPage = new SigningAuthorityPage();
        aaPage = new AccessAdminsPage();
        usersPage = new UsersPage();
        groupPage = new GroupNumbersPage();
        authPage = new AuthorizePage();
        orgData = data.organizationInfo();
        saData = data.signingAuthorityInfo();
        groupData = data.groupNumbersInfo();
        data.setSeed(123);
    });

    fit('01. should go through from Profile to Review page when all required fields are filled out', () => {
        orgPage.navigateTo();
        orgPage.fillOrgName(orgData);
        orgPage.fillAddress(orgData);
        orgPage.scrollDown();
        orgPage.clickOption('thirdPartyTrue');
        orgPage.fillOrgNum(orgData);
        orgPage.scrollDown();
        // browser.sleep(1000 * 5);
        orgPage.continue();
        saPage.navigateTo();
        saPage.selectValue('userTitle', 'Ms.');
        saPage.fillInfo(saData);
        saPage.scrollDown();
        saPage.selectValue('administeringFor', 'Employees');
        // browser.sleep(1000 * 5);
        saPage.continue();
        aaPage.navigateTo();
        aaPage.clickButton('btn btn-block', ' Add New Access Admin ');
        aaPage.fillInfo(saData);
        aaPage.scrollDown();
        aaPage.selectValue('administeringFor', 'Employees');
        // browser.sleep(1000 * 5);
        aaPage.continue();
        usersPage.navigateTo();
        usersPage.clickButton('btn btn-block', ' Add New User ');
        usersPage.fillInfo(saData);
        usersPage.scrollDown();
        usersPage.selectValue('administeringFor', 'Employees');
        // browser.sleep(1000 * 5);
        usersPage.continue();
        groupPage.navigateTo();
        groupPage.clickButton('btn btn-block', ' Add New Group Number ');
        groupPage.fillGroupNum(groupData);
        // browser.sleep(1000 * 5);
        groupPage.continue();
        authPage.navigateTo();
        authPage.scrollDown();
        authPage.clickCheckBox('consent');
    }, 60000);

});

