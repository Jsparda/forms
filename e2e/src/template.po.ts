import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class TemplatePage {

    mailinput: ElementFinder;
    pais: ElementFinder;

    constructor(){
        this.mailinput = element(by.name('correo'));
        this.pais = element(by.cssContainingText('opcion', 'Cuba'));
    }

    setMail(mail: string): Promise<void>{
        this.mailinput.clear();
        return this.mailinput.sendKeys(mail) as Promise<void>;
      }

    getmail(): Promise<string>{ // regresa el texto del input name
        return this.mailinput.getAttribute('value') as Promise<string>;
    }

    navigateToTemplatePage(): Promise<unknown> { // navega a la ruta /reactive
        return browser.get(browser.baseUrl + 'template') as Promise<unknown>;
    }
}
