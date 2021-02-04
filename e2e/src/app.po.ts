import { browser, by, element, ElementArrayFinder, ElementFinder } from 'protractor';

export class ReactivePage { // clase de la página formularios reactive

  title: ElementFinder;
  nameinput: ElementFinder;
  lastinput: ElementFinder;
  mailinput: ElementFinder;
  userinput: ElementFinder;
  pass1input: ElementFinder;
  pass2input: ElementFinder;
  stateinput: ElementFinder;
  cityinput: ElementFinder;
  saveButton: ElementFinder;
  addButton: ElementFinder;
  deleteButton: ElementArrayFinder;
  errorsText: ElementArrayFinder;
  status: ElementFinder;

  constructor() {
    this.title = element(by.css('h4')); // obtenemos el elemento h4
    this.nameinput = element(by.css('input[formControlName=nombre]')); // obtenemos en input por formControlName
    this.lastinput = element(by.css('input[formControlName=apellido]')); // obtenemos en input por formControlName
    this.mailinput = element(by.css('input[formControlName=correo]')); // obtenemos en input por formControlName
    this.userinput = element(by.css('input[formControlName=usuario]')); // obtenemos en input por formControlName
    this.pass1input = element(by.css('input[formControlName=pass1]'));
    this.pass2input = element(by.css('input[formControlName=pass2]'));
    this.stateinput = element(by.css('input[formControlName=estado'));
    this.cityinput = element(by.css('input[formControlName=municipio'));
    this.saveButton = element(by.className('btn-outline-primary')); // obtenemos el elemento por el nombre de la clase
    this.addButton = element(by.className('btn-success'));
    this.errorsText = element.all(by.css('.text-danger')); // obtenemos todos los elementos con la clase text-danger
    // this.status = element(by.binding('forma.status'));
    this.deleteButton = element.all(by.className('btn-danger'));
  }

  navigateToReactivePage(): Promise<unknown> { // navega a la ruta /reactive
    return browser.get(browser.baseUrl + 'reactive') as Promise<unknown>;
  }

  getTitleText(): Promise<string> { // obtiene el titulo de la página
    return this.title.getText() as Promise<string>;
  }

  setName(name: string): Promise<void>{ // escribe el el input name
    this.nameinput.clear();
    return this.nameinput.sendKeys(name) as Promise<void>;
  }

  getName(): Promise<string>{ // regresa el texto del input name
    return this.nameinput.getAttribute('value') as Promise<string>;
  }

  setLast(last: string): Promise<void>{
    this.lastinput.clear();
    return this.lastinput.sendKeys(last) as Promise<void>;
  }

  getLast(): Promise<string>{ // regresa el texto del input name
    return this.lastinput.getAttribute('value') as Promise<string>;
  }
  setMail(mail: string): Promise<void>{
    this.mailinput.clear();
    return this.mailinput.sendKeys(mail) as Promise<void>;
  }
  getmail(): Promise<string>{ // regresa el texto del input name
    return this.mailinput.getAttribute('value') as Promise<string>;
  }

  setUser(user: string): Promise<void>{
    this.userinput.clear();
    return this.userinput.sendKeys(user) as Promise<void>;
  }

  getUser(): Promise<string>{
    return this.userinput.getAttribute('value') as Promise<string>;
  }

  setPass1(pass1: string): Promise<void>{
    this.pass1input.clear();
    return this.pass1input.sendKeys(pass1) as Promise<void>;
  }

  getPass1(): Promise<string>{
    return this.pass2input.getAttribute('value') as Promise<string>;
  }
  setPass2(pass2: string): Promise<void>{
    this.pass2input.clear();
    return this.pass2input.sendKeys(pass2) as Promise<void>;
  }

  getPass2(): Promise<string>{
    return this.pass2input.getAttribute('value') as Promise<string>;
  }

  setState(state: string): Promise<void>{
    this.stateinput.clear();
    return this.stateinput.sendKeys(state) as Promise<void>;
  }

  getState(): Promise<string>{
    return this.stateinput.getAttribute('value') as Promise<string>;
  }
  setCity(city: string): Promise<void>{
    this.cityinput.clear();
    return this.cityinput.sendKeys(city) as Promise<void>;
  }

  getCity(): Promise<string>{
    return this.cityinput.getAttribute('value') as Promise<string>;
  }

  clickSaveButton(): Promise<void>{ // presiona el botón guardar
    return this.saveButton.click() as Promise<void>;
  }

  clickAddButton(): Promise<void>{ // presiona el botón añadir
    return this.addButton.click() as Promise<void>;
  }

  clickDeleteButton(): Promise<void>{
    return this.deleteButton.click() as Promise<void>;
  }

  deleteHobbieButtonIsPresent(): Promise<boolean>{ // comprueba si el botón borrar existe
    this.addButton = element(by.className('btn-danger'));
    return this.addButton.isPresent() as Promise<boolean>;
  }

  getTextOfEspecificError(indice: number): Promise<string>{ // obtiene el texto de un mensaje de error especifico
    return this.errorsText.get(indice).getText() as Promise<string>;
  }
}
