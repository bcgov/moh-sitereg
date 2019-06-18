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
    let data = new FakeDataSiteReg();

    // TODO: Refactor URLs
    const ORG_PAGE_URL = `register/organization`;
    const SA_PAGE_URL = `register/signing-authority`;
    const AA_PAGE_URL = `register/access-admins`;
    const USERS_PAGE_URL = `register/users`;
    const GROUP_PAGE_URL = `register/group-numbers`;
    const REVIEW_PAGE_URL = `register/review`;
    const AUTH_PAGE_URL = `register/authorize`;
    const CONFIRM_PAGE_URL = `register/confirmation`;

    const jsonData = data.getJSONData();
    if (data != null) { // Uses JSON data
        data = jsonData;
    } else {  // Uses Faker data
        const orgData = data.organizationInfo();
        const saData = data.signingAuthorityInfo();
        const groupData = data.groupNumbersInfo();
        data.setSeed();
    }

    beforeEach(() => {
        orgPage = new OrganizationPage();
        saPage = new SigningAuthorityPage();
        aaPage = new AccessAdminsPage();
        usersPage = new UsersPage();
        groupPage = new GroupNumbersPage();
        authPage = new AuthorizePage();
        reviewPage = new ReviewPage();
        scPage = new SpecialCasePage();
    });

    it('01. should navigate from Profile to Review page (end-to-end) when all required fields are filled out', () => {
        orgPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(ORG_PAGE_URL, 'should navigate to the Organization Page');
        orgPage.fillPage();
        expect(browser.getCurrentUrl()).toContain(SA_PAGE_URL, 'should continue to the Signing Authority Page');
        saPage.fillPage();
        expect(browser.getCurrentUrl()).toContain(AA_PAGE_URL, 'should continue to the Access Admins Page');
        aaPage.continue(); // This page is already auto-filled out so no need to call fillPage()
        expect(browser.getCurrentUrl()).toContain(USERS_PAGE_URL, 'should continue to the Users Page');
        usersPage.fillPage();
        expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL, 'should continue to the Group Page');
        groupPage.fillPage();
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should continue to the Review Page');
        reviewPage.continue();
        expect(browser.getCurrentUrl()).toContain(AUTH_PAGE_URL, 'should contunue to the Authorization Page');
        authPage.fillPage();
        expect(browser.getCurrentUrl()).toContain(CONFIRM_PAGE_URL, 'should be able to succesfully submit the form');
    }, 120000);

    // Test for multiple admins

    // Test will fail since _autofill is still active in dev mode
    xit('02. should not be able to access "_autofill" dev only URL', () => {
        scPage.navigateTo();
        expect(scPage.getTextFromField()).toBe('', 'should be empty');
    });

});

