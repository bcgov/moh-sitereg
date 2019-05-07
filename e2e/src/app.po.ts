import { browser, by, element, WebElement, $$, protractor } from 'protractor';
import { AbstractTestPage } from 'moh-common-lib/e2e';

export class SiteRegTestPage extends AbstractTestPage{

  /** Every class should override this to point to the page it is testing.  */
  navigateTo() {
    return browser.get('/');
  }

  typeTextFirstOccurrence(labelId: string, text: string) {
    element.all(by.css(`input[ng-reflect-name^="${labelId}"]`)).first().sendKeys(text);
  }

}
