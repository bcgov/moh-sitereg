import { browser } from 'protractor';
import { FakeDataSiteReg } from './sitereg.data';
import { ReviewPage } from './sitereg.po';

describe('Moh SiteReg - Review Page', () => {
    let reviewPage: ReviewPage;
    const REVIEW_PAGE_URL = `register/review`;
    const AUTHORIZE_PAGE_URL = `register/authorize`;

    beforeEach(() => {
        reviewPage = new ReviewPage();
    });

    it('01. should load the page without issue', () => {
        reviewPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL);
        expect(reviewPage.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

    it('02. should let user continue once details have been reviewed', () => {
        reviewPage.navigateTo();
        reviewPage.scrollDown();
        reviewPage.continue();
        expect(browser.getCurrentUrl()).toContain(AUTHORIZE_PAGE_URL, 'should navigate to the next page');
    });

});

