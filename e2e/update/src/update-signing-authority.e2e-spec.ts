import { browser } from 'protractor';
import { FakeDataDevUpdate } from './update.data';
import { SigningAuthorityPage } from './update.po';
import { testPageLoad, testClickStepper, testSkip } from './generic-tests';

describe('IAM Update - Signing Authority Page', () => {
    let saPage: SigningAuthorityPage;
    const data = new FakeDataDevUpdate();
    let saData;
    const ORG_PAGE_URL = `sitereg/update/organization`;
    const SIGN_AUTH_PAGE_URL = `sitereg/update/signing-authority`;
    const ACCESS_PAGE_URL = `sitereg/update/access-admins`;

    beforeEach(() => {
        saPage = new SigningAuthorityPage();
        saData = data.signingAuthorityInfo();
        data.setSeed(123);
    });

    testPageLoad(SIGN_AUTH_PAGE_URL);
    testClickStepper(SIGN_AUTH_PAGE_URL, ORG_PAGE_URL, 'Organization', 'Access Admins');
    testSkip(SIGN_AUTH_PAGE_URL, ACCESS_PAGE_URL);

    it('01. should be able to add Signing Authority and continue', () => {
        expect(browser.getCurrentUrl()).toContain(ACCESS_PAGE_URL, 'should navigate to the next page');
    });

    it('02. should be able to remove Signing Authority and continue', () => {
        expect(browser.getCurrentUrl()).toContain(ACCESS_PAGE_URL, 'should navigate to the next page');
    });

    it('03. should be able to update Signing Authority and continue', () => {
        expect(browser.getCurrentUrl()).toContain(ACCESS_PAGE_URL, 'should navigate to the next page');
    });

    it('04. should be able to add multiple Signing Authorities and continue', () => {
        expect(browser.getCurrentUrl()).toContain(ACCESS_PAGE_URL, 'should navigate to the next page');
    });

    it('05. should be able to remove multiple Signing Authorities and continue', () => {
        expect(browser.getCurrentUrl()).toContain(ACCESS_PAGE_URL, 'should navigate to the next page');
    });

    it('06. should be able to update multiple Signing Authorities and continue', () => {
        expect(browser.getCurrentUrl()).toContain(ACCESS_PAGE_URL, 'should navigate to the next page');
    });

    it('07. should be able to add, remove and\/or update at the same time and continue', () => {
        expect(browser.getCurrentUrl()).toContain(ACCESS_PAGE_URL, 'should navigate to the next page');
    });

    it('08. should be able to add two items (Add SA and Remove SA) and delete Remove SA item using the \'x\' icon', () => {
        expect(browser.getCurrentUrl()).toContain(ACCESS_PAGE_URL, 'should navigate to the next page');
    });

});
