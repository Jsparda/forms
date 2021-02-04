import { ReactivePage } from './app.po';
import { browser, logging } from 'protractor';
import { protractor } from 'protractor/built/ptor';

const origFn = browser.driver.controlFlow().execute;
// esta función pone un retrazo de tiempo entre cada paso del controlFlow de protractor
browser.driver.controlFlow().execute = function stop() {
  const args = arguments;

  origFn.call(browser.driver.controlFlow(), () => {
    return protractor.promise.delayed(0); // tiempo de retraso entre cada paso
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};
// puede correr la prueba con el comando ng e2e en la carpeta del proyecto, si necesita cambiar el puerto escriba ademas --port=PORTNUMBER
describe('Casos de ejemplo', () => { // Engloba todas las pruebas (it) de un caso de uso a probar
  let page: ReactivePage;

  beforeEach(() => { // Este método se ejecuta antes de cada prueba
    page = new ReactivePage(); // crea un objeto de la página reactive forms
  });

  // si ponemos xit o xdescribe jasmine ignorara la prueba o el conjunto de pruebas
  it('Debe poder ir a la pagina de reactive forms', () => { // primera prueba de ejemplo
    page.navigateToReactivePage();
    expect(browser.getCurrentUrl()).toEqual(browser.baseUrl + 'reactive'); // comprobamos que carge la página
  });

  it('Debe mostrar el título de la página', async () => {
    page.navigateToReactivePage();
    const title = await page.getTitleText();
    await console.log(title); // podemos imprimir el texto en consola para debuggin
    expect(title).toEqual('Formularios Reactivos'); // comprobamos que el titulo renderizado sea el que esperamos
  });

  it('Debe escribir Jorge en el campo nombre', async () => { // en este ejemplo podemos quitar el método waitForAngular y los await
    page.navigateToReactivePage();                           // pero los dejo por que me parece mas ilustrativo para futuras prácticas
    await browser.waitForAngular(); // espera que angular este estable (termine de cargar la página)
    await page.setName('Jorge');
    expect(page.getName()).toEqual('Jorge'); // comprobamos que el input tenga el valor que le acabamos de escribir
  });

  it('Deben de estar limpios todos los campos despues de guardar', async () => { // en este ejemplo podemos quitar el método waitForAngular y los await
    page.navigateToReactivePage();                           // pero los dejo por que me parece mas ilustrativo para futuras prácticas
    await browser.waitForAngular(); // espera que angular este estable (termine de cargar la página)
    await page.setName('Jorge');
    await page.setApellido('Barrera');
    await page.setCorreo('ak31goat@try.com');
    await page.setUsuario('memo');
    await page.setContrasena('1234');
    await page.setContrasena2('1234');
    await page.setEstado('Puebla');
    await page.setMunicipio('Puebla');
    await page.clickSaveButton();

    //Comprobamos que todos los campos esten nulos
    expect(page.getName()).toEqual(''); //Comprobamos que despues de guardar el campo nombre sea nulo
    expect(page.getApellido()).toEqual(''); //Comprobamos que despues de guardar el campo apellido sea nulo
    expect(page.getCorreo()).toEqual(''); //Comprobamos que despues de guardar el campo correo sea nulo
    expect(page.getUsuario()).toEqual(''); // Comprobamos que despues de recargar el apellido sea nulo
    expect(page.getContrasena()).toEqual(''); // Comprobamos que despues de recargar el apellido sea nulo
    expect(page.getContrasena2()).toEqual(''); // Comprobamos que despues de recargar el apellido sea nulo
    expect(page.getEstado()).toEqual(''); // Comprobamos que despues de recargar el apellido sea nulo
    expect(page.getMunicipio()).toEqual(''); // Comprobamos que despues de recargar el apellido sea nulo
  });

  it('Debe mostrar un error en el campo apellido si presionamos guardar', () => {
    page.navigateToReactivePage();
    page.clickSaveButton();
    expect(page.getTextOfEspecificError(0)).toEqual('Apellido obligatorio :O'); // esperamos que aparezca el error
  });

  it('Debe mostrar un error si el campo nombre tiene menos 4 letras', () => {
    page.navigateToReactivePage();
    page.setName('Jorg');
    page.clickSaveButton();
    expect(page.getTextOfEspecificError(0)).toEqual('Ingresa al menos 5 letras :)'); // esperamos que aparezca el error
  });

  it('Debe agregar un elemento a la tabla hobbies si presionamos Agregar', async () => {
    page.navigateToReactivePage();
    await page.clickAddButton();
    expect(page.deleteHobbieButtonIsPresent()).toBeTruthy(); // esperamos que el botón este presente en la página
  });

  it('El boton borrar hobbie funciona', async () => {
    page.navigateToReactivePage();
    await page.clickAddButton();
    expect(page.deleteHobbieButtonIsPresent()).toBeTruthy(); // esperamos que el botón este presente en la página
    await page.clickDeleteButton();
    expect(page.hobbieinputIsPresent()).toBe(false);
  });

  it('Debe mostrar un error en el campo correo', () => {

    let nombres = ['jorge','jorge@','jorge@ho'];
    page.navigateToReactivePage();
    for (let nombre of nombres){
      page.setCorreo(nombre);
      //page.clickSaveButton();
      expect(page.getTextOfEspecificError(0)).toEqual('Correo obligatorio ;)'); // esperamos que aparezca el error
    }
  });

  // ******* EJERCICIOS PARA PRACTICAR ************
  // 1. llenar todos los campos del formulario reactivo correctamente, presionar el botón guardar y verificar que se
  // limpian todos los campos del formulario
  // 2. Probar que el botón de borrar hobbie funciona
  // 3. Crear el arreglo ['jorge', 'jorge@' , 'jorge@ho'] hacer una prueba que escriba cada uno de los
  // string del arreglo en el campo correo y verificar que el mensaje de error aparezca en la pantalla
  // (Se debe utilizar un for para no repetir el código por cada string en el arreglo)
  // 4. Crear 2 archivos uno para la clase formulario template y otro para el describe de las pruebas de esa página
  // (el archivo debe terminar con extención .e2e-spec.ts), recuerden hacer un método en la clase formulario template
  // que se dirija a dicha página del proyecto con la instrucción browser.get(browser.baseUrl + 'template')
  // realizar la prueba del ejercicio 3 para ese formulario
  // 5. Probar la selección de un checkbox, para ello, seleccionar Cuba del checkbox Pais,
  // sugerencia utilice la instruccion cssContainingText
  // 6. Finalmente pruebe retrasos de tiempo jugando con el tiempo en la instrucción protractor.promise.delayed(tiempo);

  // EJERCICIO SUGERIDO
  // Consulte las pruebas del tutorial en la página de protractor https://www.protractortest.org/#/tutorial
  // (si puede realice las pruebas del tutorial en un archivo de este proyecto ignorando las partes del archivo de configuración
  // porque este proyecto ya cuenta con las configuraciones necesarias)

  afterEach(async () => { // Este método se ejecuta despues de cada prueba
    // Revisa si no hay errores severos emitidos por el navegador
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});