import { browser } from 'protractor';
import { FakeDataSiteReg } from './sitereg.data';
import { AuthorizePage } from './sitereg.po';

describe('Moh SiteReg - Authorize Page', () => {
    let authPage: AuthorizePage;
    const COMPLETE_PAGE_URL = `msp-registration/complete`;
    const AUTHORIZE_PAGE_URL = `msp-registration/authorize`;

    beforeEach(() => {
        authPage = new AuthorizePage();
    });

    it('01. should load the page without issue', () => {
        authPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(AUTHORIZE_PAGE_URL);
        expect(authPage.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

    it('02. should NOT let user to continue without clicking the checkbox', () => {
        authPage.navigateTo();
        authPage.scrollDown();
        authPage.continue();
        expect(browser.getCurrentUrl()).toContain(AUTHORIZE_PAGE_URL, 'should stay on the same page');
    });

    xit('03. should let user to continue if the checkbox is clicked', () => {
        authPage.navigateTo();
        authPage.scrollDown();
        authPage.clickCheckBox('consent');
        authPage.continue();
        expect(authPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(COMPLETE_PAGE_URL, 'should navigate to the Authorize page');
    });

});

