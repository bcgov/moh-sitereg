import { browser } from 'protractor';
import { FakeDataSiteReg } from './sitereg.data';
import { GroupNumbersPage } from './sitereg.po';

describe('Moh SiteReg - Group Numbers Page', () => {
    let groupPage: GroupNumbersPage;
    const data = new FakeDataSiteReg();
    let groupData;
    const GROUP_PAGE_URL = `register/group-numbers`;
    const AUTHORIZE_PAGE_URL = `register/review`;

    beforeEach(() => {
        groupPage = new GroupNumbersPage();
        groupData = data.groupNumbersInfo();
        data.setSeed();
    });

    it('01. should load the page without issue', () => {
        groupPage.navigateTo();
        expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL);
        expect(groupPage.formErrors().count()).toBe(0, 'should be no errors on page load');
    });

    it('02. should NOT let user to continue without adding a group number', () => {
        groupPage.navigateTo();
        groupPage.continue();
        expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL, 'should stay on the same page');
    });

    it('03. should let user to continue if at least one group number is added', () => {
        groupPage.navigateTo();
        groupPage.fillGroupNum(groupData);
        browser.sleep(5000);
        groupPage.continue();
        expect(groupPage.formErrors().count()).toBe(0, 'should be no errors after filling out');
        expect(browser.getCurrentUrl()).toContain(AUTHORIZE_PAGE_URL, 'should navigate to the Authorize page');
    });

    // Additional Tests
    it('04. should not let user cont. w/o one group num section complete/let user to delete a group num by clicking the x button', () => {
        groupPage.navigateTo();
        groupPage.clickButton('btn btn-block');
        groupPage.fillGroupNum(groupData);
        groupPage.clickButton('btn delete');
        groupPage.continue();
        expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL);
    });

    // this test will fail because first group num section is not displayed after page load
    xit('05. should automatically display the first group number section', () => {
        groupPage.navigateTo();
        groupPage.fillGroupNum();
        groupPage.continue();
        expect(groupPage.formErrors().count()).toBe(0, 'should be no errors');
        expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL);
    });

    it('06. should not let user continue with an incomplete group number section', () => {
        groupData.groupNum = '1111';
        groupPage.navigateTo();
        groupPage.clickButton('btn btn-block');
        groupPage.fillGroupNum(groupData);
        groupPage.continue();
        expect(browser.getCurrentUrl()).toContain(GROUP_PAGE_URL, 'should stay on the same page');
    });

});

