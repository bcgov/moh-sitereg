import { browser } from 'protractor';
import { FakeDataSiteReg } from './sitereg.data';
import { SigningAuthorityPage } from './sitereg.po';

describe('Moh SiteReg - Signing Authority Page', () => {
    let saPage: SigningAuthorityPage;
    const data = new FakeDataSiteReg();
    let saData;
    const SA_PAGE_URL = `register/signing-authority`;
    const ORGANIZATION_PAGE_URL = `register/organization`;
    const AA_PAGE_URL = `register/access-admins`;

    beforeEach(() => {
        saPage = new SigningAuthorityPage();
        saData = data.signingAuthorityInfo();
        data.setSeed();
    });

    it('01. should load the page without issue', () => {
        saPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(SA_PAGE_URL);
        expect(saPage.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

    it('02. should NOT let user to continue without filling out any fields', () => {
        saPage.navigateTo();
        saPage.scrollDown();
        saPage.continue();
        expect(browser.getCurrentUrl()).toContain(SA_PAGE_URL, 'should still be on the same page');
    });

    it('03. should let user to continue if all the required fields are filled out', () => {
        saPage.navigateTo();
        saPage.fillInfo(0, saData);
        saPage.scrollDown();
        saPage.selectAdministeringFor('administeringFor', 'Employees');
        saPage.clickOption('bcfalse');
        saPage.continue();
        expect(saPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(AA_PAGE_URL);
    });

    // Additional Tests
    it('04. should let users go back by clicking the stepper', () => {
        saPage.navigateTo();
        saPage.clickLink('span', 'Organization');
        expect(saPage.formErrors().count()).toBe(0, 'should be no errors');
        expect(browser.getCurrentUrl()).toContain(ORGANIZATION_PAGE_URL, 'should still be on the previous page');
    });

    it('05. should NOT let user continue by clicking the stepper', () => {
        saPage.navigateTo();
        saPage.clickLink('span', 'Access Admins');
        expect(saPage.formErrors().count()).toBe(0, 'should be no errors');
        expect(browser.getCurrentUrl()).toContain(SA_PAGE_URL, 'should still be on the same page');
    });

    it('06. should make sure email address and confirm email address are the same', () => {
        saPage.navigateTo();
        saPage.fillInfo(0, saData);
        saPage.checkEmailAddress('emailAddress').then(emailAdd => {
            saPage.checkEmailAddress('confirmEmail').then(confirmEmail => {
                expect(emailAdd).toBe(confirmEmail, 'Email address and confirm email address should be the same');
            });
        });
    });
});
