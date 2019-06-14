import { browser } from 'protractor';
import { FakeDataSiteReg } from './sitereg.data';
import { OrganizationPage } from './sitereg.po';

describe('Moh SiteReg - Organization Page (ORG)', () => {
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

    it('ORG-01: should load the page without issue', () => {
        orgPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(ORGANIZATION_PAGE_URL);
        expect(orgPage.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

    it('ORG-02: should NOT let user to continue without clicking the checkbox', () => {
        orgPage.navigateTo();
        orgPage.agreeConsentModal();
        orgPage.checkConsentModal().then(function(val) {
            expect(val).toBe(true);
        });
        expect(browser.getCurrentUrl()).toContain(ORGANIZATION_PAGE_URL, 'should still be on the same page');
    });

    it('ORG-03: should NOT let user to continue without filling out any fields', () => {
        orgPage.navigateTo();
        orgPage.agreeConsentModal();
        orgPage.clickConsentModalContinue();
        orgPage.continue();
        // TODO: check if Continue Button is disabled
        expect(browser.getCurrentUrl()).toContain(ORGANIZATION_PAGE_URL, 'should still be on the same page');
    });

    it('ORG-04: should let user to continue if all the required fields are filled out', () => {
        orgPage.navigateTo();
        orgPage.agreeConsentModal();
        orgPage.clickConsentModalContinue();
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

    it('ORG-05: should let user to type the organization num and select organization that will be administering', () => {
        orgPage.navigateTo();
        orgPage.agreeConsentModal();
        orgPage.clickConsentModalContinue();
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
    it('0RG-06: should not let user continue by clicking the stepper', () => {
        orgPage.navigateTo();
        orgPage.agreeConsentModal();
        orgPage.clickConsentModalContinue();
        orgPage.clickLink('span', 'Signing Authority')
        expect(orgPage.formErrors().count()).toBe(0, 'should be no errors');
        expect(browser.getCurrentUrl()).toContain(ORGANIZATION_PAGE_URL);
    });

    it('0RG-07. should show all 13 provinces and territories in the dropbox menu', () => {
        orgPage.navigateTo();
        orgPage.agreeConsentModal();
        orgPage.clickConsentModalContinue();
        expect(orgPage.countLength('province').count()).toBe(14, 'should be 13 pronvinces and territories plus the Select Province option');
    });

    // ORG-08. should show all states when US is selected -> NO OPTION TO SELECT A COUNTRY

});
