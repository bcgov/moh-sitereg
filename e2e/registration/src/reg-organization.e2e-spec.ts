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

    it('02. should NOT let user to continue without clicking the checkbox', () => {
        orgPage.navigateTo();
        orgPage.agreeConsentModal();
        orgPage.checkConsentModal().then(val => {
            expect(val).toBe(true);
        });
        expect(browser.getCurrentUrl()).toContain(ORGANIZATION_PAGE_URL, 'should still be on the same page');
    });

    it('03. should NOT let user to continue without filling out any fields', () => {
        orgPage.navigateTo();
        orgPage.agreeConsentModal();
        orgPage.clickConsentModalContinue();
        orgPage.continue();
        expect(browser.getCurrentUrl()).toContain(ORGANIZATION_PAGE_URL, 'should still be on the same page');
    });

    it('04. should let user to continue if all the required fields are filled out', () => {
        orgPage.navigateTo();
        orgPage.agreeConsentModal();
        orgPage.clickConsentModalContinue();
        orgPage.fillOrgName(orgData);
        orgPage.fillAddress(orgData);
        orgPage.selectAdministeringFor('administeringFor', 'Employees');
        orgPage.scrollDown();
        orgPage.clickOption('thirdPartyFalse');
        orgPage.clickOption('aafalse');
        orgPage.continue();
        expect(orgPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(SA_PAGE_URL, 'should navigate to the next page');
    });

    it('05. should let user to type the organization num and select organization that will be administering', () => {
        orgPage.navigateTo();
        orgPage.agreeConsentModal();
        orgPage.clickConsentModalContinue();
        orgPage.fillOrgName(orgData);
        orgPage.fillAddress(orgData);
        orgPage.selectAdministeringFor('administeringFor', 'Employees');
        orgPage.scrollDown();
        orgPage.clickOption('thirdPartyTrue');
        orgPage.fillOrgNum(orgData);
        orgPage.clickOption('aatrue');
        orgPage.continue();
        expect(orgPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(SA_PAGE_URL, 'should navigate to the next page');
    });

    // Additional tests
    it('06. should not let user continue by clicking the stepper', () => {
        orgPage.navigateTo();
        orgPage.agreeConsentModal();
        orgPage.clickConsentModalContinue();
        orgPage.clickLink('span', 'Signing Authority')
        expect(orgPage.formErrors().count()).toBe(0, 'should be no errors');
        expect(browser.getCurrentUrl()).toContain(ORGANIZATION_PAGE_URL);
    });

    it('07. should show all 13 provinces and territories in the dropbox menu', () => {
        orgPage.navigateTo();
        orgPage.agreeConsentModal();
        orgPage.clickConsentModalContinue();
        expect(orgPage.countLength('province').count()).toBe(14, 'should be 13 pronvinces and territories plus the Select Province option');
    });

    it('08. Testing for validation re: maximum characters', () => {
        const orgMaxData = data.organizationMax();
        orgPage.navigateTo();
        orgPage.agreeConsentModal();
        orgPage.clickConsentModalContinue();
        orgPage.fillOrgName(orgMaxData);
        orgPage.fillAddress(orgMaxData);
        orgPage.selectAdministeringFor('administeringFor', 'Employees');
        orgPage.scrollDown();
        orgPage.clickOption('thirdPartyTrue');
        orgPage.fillOrgNum(orgMaxData);
        orgPage.clickOption('aafalse');
        orgPage.continue();
        expect(browser.getCurrentUrl()).toContain(SA_PAGE_URL, 'should navigate to the next page');
    });

    it('09. should not be able to continue without agreeing to information consent modal', () => {
        orgPage.navigateTo();
        orgPage.clickConsentModalContinue();
        orgPage.checkConsentModal().then(val => {
            expect(val).toBe(true, 'should still display the modal');
        });
        expect(browser.getCurrentUrl()).toContain(ORGANIZATION_PAGE_URL, 'should stay on the same page');
    });

    it('10. should require org number if user says yes to 3rd party', () => {
        orgPage.navigateTo();
        orgPage.agreeConsentModal();
        orgPage.clickConsentModalContinue();
        orgPage.fillOrgName(orgData);
        orgPage.fillAddress(orgData);
        orgPage.selectAdministeringFor('administeringFor', 'Employees');
        orgPage.scrollDown();
        orgPage.clickOption('thirdPartyTrue');
        orgPage.clickOption('aatrue');
        orgPage.continue();
        expect(browser.getCurrentUrl()).toContain(ORGANIZATION_PAGE_URL, 'should stay on the same page');
    });

});
