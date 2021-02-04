import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class TemplatePage { // clase de la página formularios template

    
  saveButton: ElementFinder;
  correoinput: ElementFinder;
  title: ElementFinder;
  errorsText: ElementArrayFinder;
  checkOption: ElementFinder;
  



  constructor() {
    this.correoinput = element(by.name('correo')); // obtenemos en input por formControlName
    this.title = element(by.css('h4')); // obtenemos el elemento h4
    this.saveButton = element(by.className('btn-outline-primary')); // obtenemos el elemento por el nombre de la clase
    this.errorsText = element.all(by.css('.text-danger')); // obtenemos todos los elementos con la clase text-danger
    this.checkOption = element(by.cssContainingText('.checkbox','Cuba'));

   }

  navigateToReactivePage(): Promise<unknown> { // navega a la ruta / template
    return browser.get(browser.baseUrl + 'template') as Promise<unknown>;
  }

  getCorreo(): Promise<string>{ // regresa el texto del input  correo
    return this.correoinput.getAttribute('value') as Promise<string>;
  }

  setCorreo(correo: string): Promise<void>{ // escribe en el input correo
    this.correoinput.clear();
    return this.correoinput.sendKeys(correo) as Promise<void>;
  }

  clickSaveButton(): Promise<void>{ // presiona el botón guardar
    return this.saveButton.click() as Promise<void>;
  }

  getTextOfEspecificError(indice: number): Promise<string>{ // obtiene el texto de un mensaje de error especifico
    return this.errorsText.get(indice).getText() as Promise<string>;
  }

  getTitleText(): Promise<string> { // obtiene el titulo de la página
    return this.title.getText() as Promise<string>;
  }

  clickCheckboxOption(): Promise<void> {
      return this.checkOption.click() as Promise<void>;
  }

  isSelectedOption(): Promise<boolean> {
    return this.checkOption.isSelected() as Promise<boolean>;
}

}
