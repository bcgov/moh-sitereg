import { SiteRegTestPage } from './app.po';
import { browser, logging } from 'protractor';

xdescribe('workspace-project App', () => {
  let page: SiteRegTestPage;

  beforeEach(() => {
    page = new SiteRegTestPage();
  });

  xit('should display welcome message', () => {
    page.navigateTo();
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
