import { browser } from 'protractor';
import { AuthorizePage } from './sitereg.po';

describe('Moh SiteReg - Authorize Page', () => {
    let authPage: AuthorizePage;
    const COMPLETE_PAGE_URL = `register/complete`;
    const AUTHORIZE_PAGE_URL = `register/authorize`;

    beforeEach(() => {
        authPage = new AuthorizePage();
    });

    it('01. should load the page without issue', () => {
        authPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(AUTHORIZE_PAGE_URL);
        expect(authPage.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

    fit('02. should NOT let user to continue without clicking the checkbox', () => {
        authPage.navigateTo();
        authPage.scrollDown();
        authPage.clickButton('submit');
        expect(browser.getCurrentUrl()).toContain(AUTHORIZE_PAGE_URL, 'should stay on the same page');
    });

    fit('03. should let user to continue if the checkbox is clicked', () => {
        authPage.navigateTo();
        authPage.scrollDown();
        authPage.agreeTermsAndConditions();
        authPage.typeCaptcha();
        authPage.continue();
        expect(authPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(COMPLETE_PAGE_URL, 'should navigate to the Authorize page');
    });

});

