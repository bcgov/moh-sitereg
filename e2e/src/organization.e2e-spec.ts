import { browser } from 'protractor';
import { FakeDataSiteReg } from './sitereg.data';
import { OrganizationPage } from './sitereg.po';

describe('Moh SiteReg - Organization Page', () => {
    let orgPage: OrganizationPage;
    const data = new FakeDataSiteReg();
    let orgData;
    const ORGANIZATION_PAGE_URL = `msp-registration/organization`;
    const SA_PAGE_URL = `msp-registration/signing-authority`;

    beforeEach(() => {
        orgPage = new OrganizationPage();
        orgData = data.organizationInfo();
        data.setSeed(123);
    });

    it('01. should load the page without issue', () => {
        orgPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(ORGANIZATION_PAGE_URL);
        expect(orgPage.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

    it('02. should NOT let user to continue without filling out any fields', () => {
        orgPage.navigateTo();
        orgPage.continue();
        expect(browser.getCurrentUrl()).toContain(ORGANIZATION_PAGE_URL, 'should still be on the same page');
    });

    it('03. should let user to continue if all the required fields are filled out', () => {
        orgPage.navigateTo();
        orgPage.fillOrgName(orgData);
        orgPage.fillAddress(orgData);
        orgPage.continue();
        expect(orgPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(SA_PAGE_URL, 'should navigate to the next page');
    });

    it('04. should let user to type organization num and select organization that will be administering', () => {
        orgPage.navigateTo();
        orgPage.fillOrgName(orgData);
        orgPage.fillAddress(orgData);
        orgPage.scrollDown();
        orgPage.clickOption('thirdPartyTrue');
        orgPage.fillOrgNum(orgData);
        orgPage.selectValue('administeringFor', 'Employees');
        browser.sleep(1000 * 10);
        orgPage.continue();
        expect(orgPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
    });

});
