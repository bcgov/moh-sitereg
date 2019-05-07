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

  clickLink(label: string, text: string) {
    element(by.cssContainingText(label, text)).click();
  }

  countLength(label: string){
    element.all(by.css(`select[ng-reflect-name^="${label}"] option`)).getSize();
  }

}
