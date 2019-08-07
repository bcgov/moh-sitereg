import { browser } from 'protractor';
import { FakeDataDevUpdate } from './update.data';
import { SigningAuthorityPage, OrganizationPage, AccessAdminsPage, UsersPage, GroupNumbersPage, SubmitPage, ReviewPage, RequestorInfoPage } from './update.po';

describe('MSP Direct Update - End to End Test (Happy Path)', () => {
    let reqPage: RequestorInfoPage;
    let orgPage: OrganizationPage;
    let saPage: SigningAuthorityPage;
    let aaPage: AccessAdminsPage;
    let usersPage: UsersPage;
    let groupPage: GroupNumbersPage;
    let reviewPage: ReviewPage;
    let submitPage: SubmitPage;

    const data = new FakeDataDevUpdate();
    let reqData;
    let orgData;
    let saData;
    let groupData;

    const REQ_PAGE_URL = `update/requestor`;
    const ORG_PAGE_URL = `update/organization`;
    const SA_PAGE_URL = `update/signing-authority`;
    const AA_PAGE_URL = `update/access-admins`;
    const USERS_PAGE_URL = `update/users`;
    const GROUP_PAGE_URL = `update/group-numbers`;
    const REVIEW_PAGE_URL = `update/review`;
    const SUBMIT_PAGE_URL = `update/submit`;
    const CONFIRM_PAGE_URL = `update/confirmation`;

    beforeEach(() => {
        reqPage = new RequestorInfoPage();
        orgPage = new OrganizationPage();
        saPage = new SigningAuthorityPage();
        aaPage = new AccessAdminsPage();
        usersPage = new UsersPage();
        groupPage = new GroupNumbersPage();
        submitPage = new SubmitPage();
        reviewPage = new ReviewPage();
        reqData = data.requestorInfo();
        orgData = data.organizationInfo();
        saData = data.signingAuthorityInfo();
        groupData = data.groupNumbersInfo();
        data.setSeed(123);
    });

    it('Should navigate from Requestor Info to Confirmation Page (end-to-end) when all required fields are filled out', () => {
        reqPage.fillConsentModal(REQ_PAGE_URL);
        expect(browser.getCurrentUrl()).toContain(REQ_PAGE_URL, 'should navigate to the Requestor Info Page');
        reqPage.fillPage();
        reqPage.continue();
        expect(browser.getCurrentUrl()).toContain(ORG_PAGE_URL, 'should navigate to the Organization Page');
        orgPage.fillPage();
        orgPage.continue();
        expect(browser.getCurrentUrl()).toContain(SA_PAGE_URL, 'should continue to the Signing Authority Page');
        saPage.fillPage();
        saPage.continue();
        expect(browser.getCurrentUrl()).toContain(AA_PAGE_URL, 'should continue to the Access Admins Page');
        aaPage.fillPage();
        aaPage.continue();
        expect(browser.getCurrentUrl()).toContain(USERS_PAGE_URL, 'should continue to the Users Page');
        // usersPage.continue();
        // // usersPage.fillPage(); Method not yet working
        // expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL, 'should continue to the Group Page');
        // groupPage.fillPage(groupData);
        // expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should continue to the Review Page');
        // reviewPage.continue();
        // expect(browser.getCurrentUrl()).toContain(SUBMIT_PAGE_URL, 'should contunue to the Submit Page');
        // submitPage.typeCaptcha();
        // expect(browser.getCurrentUrl()).toContain(CONFIRM_PAGE_URL, 'should be able to succesfully submit the form');
    }, 120000);

});

