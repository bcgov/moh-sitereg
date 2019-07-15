import { browser } from 'protractor';
import { BaseDevUpdateTestPage } from './update.po';

const page = new BaseDevUpdateTestPage();

export function testPageLoad(PAGE_URL: string) {
    it('GENERIC TEST 01. should load the page without issue', () => {
        page.navigateToURL(PAGE_URL);
        expect(browser.getCurrentUrl()).toContain(PAGE_URL);
        expect(page.formErrors().count()).toBe(0, 'should be no errors on page load');
    });
}

export function testClickPrevStepper(CURR_PAGE_URL: string, PREV_PAGE_URL: string, prevLink: string) {
    it('GENERIC TEST 02. should let user to go back to the previous page by clicking the stepper', () => {
        page.navigateToURL(CURR_PAGE_URL);
        page.clickLink('span', prevLink);
        expect(browser.getCurrentUrl()).toContain(PREV_PAGE_URL, 'should navigate to the previous page');
    });
}

export function testClickNextStepper(PAGE_URL: string, nextLink: string) {
    it('GENERIC TEST 03. should NOT let user continue by clicking the stepper', () => {
        page.navigateToURL(PAGE_URL);
        page.clickLink('span', nextLink);
        expect(browser.getCurrentUrl()).toContain(PAGE_URL, 'should still be on the same page');
    });
}

export function testClickStepper(CURR_PAGE_URL: string, PREV_PAGE_URL: string, prevLink: string, nextLink: string) {
    testClickPrevStepper(CURR_PAGE_URL, PREV_PAGE_URL, prevLink);
    testClickNextStepper(CURR_PAGE_URL, nextLink);
}

export function testClickContinue(PAGE_URL: string) {
    it('GENERIC TEST 04. should NOT let user to continue if they did not filled out required fields', () => {
        page.navigateToURL(PAGE_URL);
        page.continue();
        expect(browser.getCurrentUrl()).toContain(PAGE_URL, 'should still be on the same page');
    });
}

export function testSkip(CURR_PAGE_URL: string, NEXT_PAGE_URL: string) {
    it('GENERIC TEST 05. should let user continue or skip without filling out any fields', () => {
        page.navigateToURL(CURR_PAGE_URL);
        page.continue();
        expect(browser.getCurrentUrl()).toContain(NEXT_PAGE_URL, 'should navigate to the next page');
    });
}

