import { browser } from 'protractor';
import { FakeDataSiteReg } from './sitereg.data';
import { SigningAuthorityPage, OrganizationPage, AccessAdminsPage, UsersPage, GroupNumbersPage, AuthorizePage, SpecialCasePage, ReviewPage } from './sitereg.po';
import { BrowserViewportScroller } from '@angular/common/src/viewport_scroller';

describe('BCSC Enrollment - End to End', () => {
    let orgPage: OrganizationPage;
    let saPage: SigningAuthorityPage;
    let aaPage: AccessAdminsPage;
    let usersPage: UsersPage;
    let groupPage: GroupNumbersPage;
    let reviewPage: ReviewPage;
    let authPage: AuthorizePage;
    let scPage: SpecialCasePage;
    const data = new FakeDataSiteReg();
    let orgData;
    let saData;
    let groupData;
    // TODO: Refactor URLs
    const ORG_PAGE_URL = `register/organization`;
    const SA_PAGE_URL = `register/signing-authority`;
    const AA_PAGE_URL = `register/access-admins`;
    const USERS_PAGE_URL = `register/users`;
    const GROUP_PAGE_URL = `register/group-numbers`;
    const REVIEW_PAGE_URL = `register/review`;
    const AUTH_PAGE_URL = `register/authorize`;

    beforeEach(() => {
        orgPage = new OrganizationPage();
        saPage = new SigningAuthorityPage();
        aaPage = new AccessAdminsPage();
        usersPage = new UsersPage();
        groupPage = new GroupNumbersPage();
        authPage = new AuthorizePage();
        reviewPage = new ReviewPage();
        scPage = new SpecialCasePage();
        orgData = data.organizationInfo();
        saData = data.signingAuthorityInfo();
        groupData = data.groupNumbersInfo();
        data.setSeed();
    });

    it('01. should go through from Profile to Review page when all required fields are filled out', () => {
        orgPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(ORG_PAGE_URL, 'should navigate to the next page');

        orgPage.clickAgree();
        orgPage.clickModalContinue();
        orgPage.fillOrgName(orgData);
        orgPage.fillAddress(orgData);
        orgPage.selectValue('administeringFor', 'Employees');
        orgPage.scrollDown();
        orgPage.clickOption('thirdPartyTrue');
        orgPage.fillOrgNum(orgData);
        orgPage.clickOption('aatrue');
        orgPage.continue();
        expect(browser.getCurrentUrl()).toContain(SA_PAGE_URL, 'should navigate to the next page');

        saPage.selectValue('userTitle', 'Ms.');
        saPage.fillInfo(saData);
        saPage.scrollDown();
        saPage.selectValue('administeringFor', 'Employees');
        saPage.clickOption('bctrue');
        saPage.continue();
        expect(browser.getCurrentUrl()).toContain(AA_PAGE_URL, 'should navigate to the next page');

        // aaPage.fillInfo(saData);
        aaPage.scrollDown();
        // aaPage.selectValue('administeringFor', 'Employees');
        aaPage.continue();
        expect(browser.getCurrentUrl()).toContain(USERS_PAGE_URL, 'should navigate to the next page');

        usersPage.clickButton('btn btn-block');
        usersPage.fillInfo(saData);
        usersPage.scrollDown();
        usersPage.selectValue('administeringFor', 'Employees');
        usersPage.continue();
        expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL, 'should navigate to the next page');

        groupPage.fillGroupNum(groupData);
        groupPage.continue();
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should navigate to the next page');

        reviewPage.scrollDown();
        reviewPage.continue();
        expect(browser.getCurrentUrl()).toContain(AUTH_PAGE_URL, 'should navigate to the next page');

        authPage.scrollDown();
        // Insert submitApplication method here once it's working
    }, 60000);

    // Test will fail since _autofill is still active in dev mode
    xit('02. should not be able to access "_autofill" dev only URL', () => {
        scPage.navigateTo();
        expect(scPage.getTextFromField()).toBe('', 'should be empty');
    });

});

