import { browser } from 'protractor';
import { FakeDataDevUpdate } from './update.data';
import { MSPGroupsPage } from './update.po';
import { testPageLoad, testClickStepper, testSkip } from './generic-tests';

describe('IAM Update - MSP Groups Page', () => {
    let groupPage: MSPGroupsPage;
    const data = new FakeDataDevUpdate();
    let groupData;
    const USER_PAGE_URL = `sitereg/update/users`;
    const GROUP_NUMBERS_PAGE_URL = `sitereg/update/group-numbers`;
    const REVIEW_PAGE_URL = `sitereg/update/review`;

    beforeEach(() => {
        groupPage = new MSPGroupsPage();
        groupData = data.groupNumbersInfo();
        data.setSeed(123);
    });

    testPageLoad(GROUP_NUMBERS_PAGE_URL);
    testClickStepper(GROUP_NUMBERS_PAGE_URL, USER_PAGE_URL, 'Users', 'Review');
    testSkip(GROUP_NUMBERS_PAGE_URL, REVIEW_PAGE_URL);

    it('01. should be able to add MSP Group number', () => {
        groupPage.navigateTo();
        groupPage.clickButton('btn', 'Add MSP Group');
        groupPage.typeGroupNumber('Add new MSP Group #1', 'goupNo_0', groupData);
        groupPage.checkThirdPartyAdmin('goupNo_0', 'Will this group', 'Yes');
        groupPage.checkInputDisplayed('Add new MSP Group #1', 'goupNo_0').then(function(val){
            expect(val).toBe(groupData.groupNum.toString());
        });
        groupPage.continue();
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should navigate to the next page');
    });

    it('02. should be able to remove MSP Group number', () => {
        groupPage.navigateTo();
        groupPage.clickButton('btn', 'Remove MSP Group');
        groupPage.typeGroupNumber('Remove new MSP Group #1', 'goupNo_0', groupData);
        groupPage.checkInputDisplayed('Remove new MSP Group #1', 'goupNo_0').then(function(val){
            expect(val).toBe(groupData.groupNum.toString());
        });
        groupPage.continue();
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should navigate to the next page');
    });

    it('03. should be able to update MSP Group number', () => {
        groupPage.navigateTo();
        groupPage.clickButton('btn', 'Update administration of MSP Group');
        groupPage.typeGroupNumber('Update administration of MSP Group #1', 'goupNo_0', groupData);
        groupPage.checkThirdPartyAdmin('goupNo_0', 'Is the group', 'No');
        groupPage.checkInputDisplayed('Update administration of MSP Group #1', 'goupNo_0').then(function(val){
            expect(val).toBe(groupData.groupNum.toString());
        });
        groupPage.continue();
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should navigate to the next page');
    });

    it('04. should be able to add multiple MSP Group numbers', () => {
        const groupNum0 = groupData.groupNum = '1234567';
        groupPage.navigateTo();
        groupPage.clickButton('btn', 'Add MSP Group');
        groupPage.typeGroupNumber('Add new MSP Group #1', 'goupNo_0', groupData);
        groupPage.checkThirdPartyAdmin('goupNo_0', 'Will this group', 'Yes');
        const groupNum1 = groupData.groupNum = '7654321';
        groupPage.clickButton('btn', 'Add MSP Group');
        groupPage.typeGroupNumber('Add new MSP Group #2', 'goupNo_1', groupData);
        groupPage.checkThirdPartyAdmin('goupNo_1', 'Will this group', 'No');
        groupPage.checkInputDisplayed('Add new MSP Group #1', 'goupNo_0').then(function(val){
            expect(val).toBe(groupNum0.toString());
        });
        groupPage.checkInputDisplayed('Add new MSP Group #2', 'goupNo_1').then(function(val){
            expect(val).toBe(groupNum1.toString());
        });
        groupPage.continue();
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should navigate to the next page');
    });

    it('05. should be able to remove multiple MSP Group numbers', () => {
        const groupNum0 = groupData.groupNum = '1234567';
        groupPage.navigateTo();
        groupPage.clickButton('btn', 'Remove MSP Group');
        groupPage.typeGroupNumber('Remove new MSP Group #1', 'goupNo_0', groupData);
        const groupNum1 = groupData.groupNum = '7654321';
        groupPage.clickButton('btn', 'Remove MSP Group');
        groupPage.typeGroupNumber('Remove new MSP Group #2', 'goupNo_1', groupData);
        groupPage.checkInputDisplayed('Remove new MSP Group #1', 'goupNo_0').then(function(val){
            expect(val).toBe(groupNum0.toString());
        });
        groupPage.checkInputDisplayed('Remove new MSP Group #2', 'goupNo_1').then(function(val){
            expect(val).toBe(groupNum1.toString());
        });
        groupPage.continue();
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should navigate to the next page');
    });

    it('06. should be able to update multiple MSP Group numbers', () => {
        const groupNum0 = groupData.groupNum = '1234567';
        groupPage.navigateTo();
        groupPage.clickButton('btn', 'Update administration of MSP Group');
        groupPage.typeGroupNumber('Update administration of MSP Group #1', 'goupNo_0', groupData);
        groupPage.checkThirdPartyAdmin('goupNo_0', 'Is the group', 'No');
        const groupNum1 = groupData.groupNum = '7654321';
        groupPage.clickButton('btn', 'Update administration of MSP Group');
        groupPage.typeGroupNumber('Update administration of MSP Group #2', 'goupNo_1', groupData);
        groupPage.checkThirdPartyAdmin('goupNo_1', 'Is the group', 'Yes');
        groupPage.checkInputDisplayed('Update administration of MSP Group #1', 'goupNo_0').then(function(val){
            expect(val).toBe(groupNum0.toString());
        });
        groupPage.checkInputDisplayed('Update administration of MSP Group #2', 'goupNo_1').then(function(val){
            expect(val).toBe(groupNum1.toString());
        });
        groupPage.continue();
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should navigate to the next page');
    });

    it('07. should be able to add, remove and\/or update at the same time', () => {
        const groupNum0 = groupData.groupNum = '1234567';
        groupPage.navigateTo();
        groupPage.clickButton('btn', 'Add MSP Group');
        groupPage.typeGroupNumber('Add new MSP Group #1', 'goupNo_0', groupData);
        groupPage.checkThirdPartyAdmin('goupNo_0', 'Will this group', 'Yes');
        const groupNum1 = groupData.groupNum = '7654321';
        groupPage.clickButton('btn', 'Remove MSP Group');
        groupPage.typeGroupNumber('Remove new MSP Group #1', 'goupNo_0', groupData);
        groupPage.checkInputDisplayed('Add new MSP Group #1', 'goupNo_0').then(function(val){
            expect(val).toBe(groupNum0.toString());
        });
        groupPage.checkInputDisplayed('Remove new MSP Group #1', 'goupNo_0').then(function(val){
            expect(val).toBe(groupNum1.toString());
        });
        groupPage.continue();
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should navigate to the next page');
    });

    it('08. should be able to add two items (Add MSP and Remove MSP) and delete Remove MSP item using the \'x\' icon', () => {
        const groupNum0 = groupData.groupNum = '1234567';
        groupPage.navigateTo();
        groupPage.clickButton('btn', 'Add MSP Group');
        groupPage.typeGroupNumber('Add new MSP Group #1', 'goupNo_0', groupData);
        groupPage.checkThirdPartyAdmin('goupNo_0', 'Will this group', 'Yes');
        const groupNum1 = groupData.groupNum = '7654321';
        groupPage.clickButton('btn', 'Remove MSP Group');
        groupPage.typeGroupNumber('Remove new MSP Group #1', 'goupNo_0', groupData);
        groupPage.clickXIcon('Remove new MSP Group #1');
        expect(groupPage.checkTextDisplayed('Remove new MSP Group #1')).toBe(false);
        groupPage.continue();
        expect(browser.getCurrentUrl()).toContain(REVIEW_PAGE_URL, 'should navigate to the next page');
    });


});
