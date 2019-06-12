import { browser } from 'protractor';
import { FakeDataSiteReg } from './sitereg.data';
import { OrganizationPage } from './sitereg.po';

describe('Moh SiteReg - Organization Page', () => {
    let orgPage: OrganizationPage;
    const data = new FakeDataSiteReg();
    let orgData;
    const ORGANIZATION_PAGE_URL = `register/organization`;
    const SA_PAGE_URL = `register/signing-authority`;

    beforeEach(() => {
        orgPage = new OrganizationPage();
        orgData = data.organizationInfo();
        data.setSeed();
    });

    it('01. should load the page without issue', () => {
        orgPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(ORGANIZATION_PAGE_URL);
        expect(orgPage.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

    it('02-a. should NOT let user to continue without clicking the checkbox', () => {
        orgPage.navigateTo();
        orgPage.clickModalContinue();
        orgPage.checkModal().then(function(val) {
            expect(val).toBe(true);
        });
        expect(browser.getCurrentUrl()).toContain(ORGANIZATION_PAGE_URL, 'should still be on the same page');
    });

    it('02-b. should NOT let user to continue without filling out any fields', () => {
        orgPage.navigateTo();
        orgPage.clickAgree();
        orgPage.clickModalContinue();
        orgPage.continue();
        expect(browser.getCurrentUrl()).toContain(ORGANIZATION_PAGE_URL, 'should still be on the same page');
    });

    it('03. should let user to continue if all the required fields are filled out', () => {
        orgPage.navigateTo();
        orgPage.clickAgree();
        orgPage.clickModalContinue();
        orgPage.fillOrgName(orgData);
        orgPage.fillAddress(orgData);
        orgPage.selectValue('administeringFor', 'Employees');
        orgPage.scrollDown();
        orgPage.clickOption('thirdPartyFalse');
        orgPage.clickOption('aafalse');
        orgPage.continue();
        expect(orgPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(SA_PAGE_URL, 'should navigate to the next page');
    });

    it('04. should let user to type organization num and select organization that will be administering', () => {
        orgPage.navigateTo();
        orgPage.clickAgree();
        orgPage.clickModalContinue();
        orgPage.fillOrgName(orgData);
        orgPage.fillAddress(orgData);
        orgPage.selectValue('administeringFor', 'Employees');
        orgPage.scrollDown();
        orgPage.clickOption('thirdPartyTrue');
        orgPage.fillOrgNum(orgData);
        orgPage.clickOption('aatrue');
        orgPage.continue();
        expect(orgPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(SA_PAGE_URL, 'should navigate to the next page');
    });

    // Additional tests
    it('05. should not let user continue by clicking the stepper', () => {
        orgPage.navigateTo();
        orgPage.clickAgree();
        orgPage.clickModalContinue();
        orgPage.clickLink('span', 'Signing Authority')
        expect(orgPage.formErrors().count()).toBe(0, 'should be no errors');
        expect(browser.getCurrentUrl()).toContain(ORGANIZATION_PAGE_URL);
    });

    it('06. should show all 13 provinces and territories', () => {
        orgPage.navigateTo();
        orgPage.clickAgree();
        orgPage.clickModalContinue();
        expect(orgPage.countLength('province').count()).toBe(14, 'should be 13 pronvinces and territories plus the Select Province option');
    });

    // should show all states when US is selected - NO OPTION TO SELECT A COUNTRY

});
