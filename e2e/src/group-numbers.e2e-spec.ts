import { browser } from 'protractor';
import { FakeDataSiteReg } from './sitereg.data';
import { GroupNumbersPage } from './sitereg.po';

describe('Moh SiteReg - Group Numbers Page', () => {
    let groupPage: GroupNumbersPage;
    const data = new FakeDataSiteReg();
    let groupData;
    const GROUP_PAGE_URL = `msp-registration/group-numbers`;
    const AUTHORIZE_PAGE_URL = `msp-registration/authorize`;

    beforeEach(() => {
        groupPage = new GroupNumbersPage();
        groupData = data.groupNumbersInfo();
        data.setSeed(123);
    });

    it('01. should load the page without issue', () => {
        groupPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL);
        expect(groupPage.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

    it('02. should NOT let user to continue without adding a group number', () => {
        groupPage.navigateTo();
        groupPage.continue();
        expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL, 'should stay on thesame page');
    });

    it('03. should let user to continue if at least one group number is added', () => {
        groupPage.navigateTo();
        groupPage.clickButton('btn btn-block', ' Add New Group Number ');
        groupPage.fillGroupNum(groupData);
        browser.sleep(1000 * 10);
        groupPage.continue();
        expect(groupPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(AUTHORIZE_PAGE_URL, 'should navigate to the Authorize page');
    });

});
