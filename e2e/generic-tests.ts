import { browser } from 'protractor';
import { OrganizationPage, RequestorInfoPage, BaseDevUpdateTestPage } from './update/src/update.po';

export function onPageLoadTest(page: BaseDevUpdateTestPage, PAGE_URL: string) {

    page = new BaseDevUpdateTestPage();

    it('GENERIC TEST 01. should load the page without issue', () => {
        page.navigateTo();
        expect(browser.getCurrentUrl()).toContain(PAGE_URL);
        expect(page.formErrors().count()).toBe(0, 'should be no errors on page load');
    });
}

export function clickStepperTest(page: BaseDevUpdateTestPage, PAGE_URL: string, value: string) {

    page = new BaseDevUpdateTestPage();

    it('GENERIC TEST 02. should NOT let user continue by clicking the stepper', () => {
        page.navigateTo();
        page.clickLink('span', value);
        expect(browser.getCurrentUrl()).toContain(PAGE_URL, 'should still be on the same page');
    });
}