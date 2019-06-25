import { browser } from 'protractor';
import { FakeDataDevUpdate } from './dev-update.data';
import { OrganizationPage } from './dev-update.po';

describe('IAM Dev Update - Organization Page', () => {
    let orgPage: OrganizationPage;
    const data = new FakeDataDevUpdate();
    let orgData;
    const ORG_PAGE_URL = `sitereg/update/organization`;
    const SIGN_AUTH_PAGE_URL = `sitereg/update/signing-authority`;

    beforeEach(() => {
        orgPage = new OrganizationPage();
        orgData = data.organizationInfo();
        data.setSeed(123);
    });

    it('01. should load the page without issue', () => {
        orgPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(ORG_PAGE_URL);
        expect(orgPage.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

});
