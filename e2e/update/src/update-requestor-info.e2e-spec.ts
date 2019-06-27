import { browser } from 'protractor';
import { FakeDataDevUpdate } from './update.data';
import { RequestorInfoPage } from './update.po';
import { onPageLoadTest, onClickNextStepperTest, onClickContinueTest } from './generic-tests';

describe('IAM Update - Requestor Info Page', () => {
    let requestorPage: RequestorInfoPage;
    const data = new FakeDataDevUpdate();
    let requestorData;
    const REQUESTOR_PAGE_URL = `sitereg/update/identify`;
    const ORG_PAGE_URL = `sitereg/update/organization`;

    beforeEach(() => {
        requestorPage = new RequestorInfoPage();
        requestorData = data.requestorInfo();
        data.setSeed(123);
    });

    onPageLoadTest(ORG_PAGE_URL);
    onClickNextStepperTest(REQUESTOR_PAGE_URL, 'Organization');
    onClickContinueTest(ORG_PAGE_URL);

    it('01. should NOT let user to continue if the inputs are wrong/invalidated', () => {
        requestorData.orgNum = '1234567';
        requestorData.email = 'sample@email';
        requestorPage.navigateTo();
        requestorPage.fillPage(requestorData);
        requestorPage.continue();
        expect(browser.getCurrentUrl()).toContain(REQUESTOR_PAGE_URL);
    });

    it('02. should let user to continue if the inputs are correct', () => {
        requestorPage.navigateTo();
        requestorPage.fillPage(requestorData);
        requestorPage.continue();
        expect(browser.getCurrentUrl()).toContain(ORG_PAGE_URL);
    });

});
