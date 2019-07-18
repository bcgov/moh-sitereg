import { browser } from 'protractor';
import { FakeDataSiteReg } from './sitereg.data';
import { SigningAuthorityPage, OrganizationPage, AccessAdminsPage, UsersPage, GroupNumbersPage, AuthorizePage, SpecialCasePage, ReviewPage } from './sitereg.po';
import { BrowserViewportScroller } from '@angular/common/src/viewport_scroller';

describe('Moh SiteReg - End to End Test (Happy Path)', () => {
    let orgPage: OrganizationPage;
    let saPage: SigningAuthorityPage;
    let aaPage: AccessAdminsPage;
    let usersPage: UsersPage;
    let groupPage: GroupNumbersPage;
    let reviewPage: ReviewPage;
    let authPage: AuthorizePage;
    let scPage: SpecialCasePage;

    const ORG_PAGE_URL = `register/organization`;
    const SA_PAGE_URL = `register/signing-authority`;
    const AA_PAGE_URL = `register/access-admins`;
    const USERS_PAGE_URL = `register/users`;
    const GROUP_PAGE_URL = `register/group-numbers`;
    const REVIEW_PAGE_URL = `register/review`;
    const AUTH_PAGE_URL = `register/authorize`;
    const CONFIRM_PAGE_URL = `register/confirmation`;

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

    it('Should navigate from Organization to Confirmation Page (end-to-end) when all required fields are filled out', () => {
        orgPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(ORG_PAGE_URL, 'should navigate to the Organization Page');
        orgPage.fillPage();
        expect(browser.getCurrentUrl()).toContain(SA_PAGE_URL, 'should continue to the Signing Authority Page');
        saPage.fillPage();
        expect(browser.getCurrentUrl()).toContain(AA_PAGE_URL, 'should continue to the Access Admins Page');
        aaPage.fillPage();
        expect(browser.getCurrentUrl()).toContain(USERS_PAGE_URL, 'should continue to the Users Page');
        usersPage.fillPage();
         // should show the "Will this group be administered?" question if the user selected 3rd party administrators on the Organization page
        expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL, 'should continue to the Group Page');
        groupPage.fillPage();
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should continue to the Review Page');
        reviewPage.continue();
        expect(browser.getCurrentUrl()).toContain(AUTH_PAGE_URL, 'should contunue to the Authorization Page');
        authPage.fillPage();
        expect(browser.getCurrentUrl()).toContain(CONFIRM_PAGE_URL, 'should be able to succesfully submit the form');
    }, 2000000);

});

