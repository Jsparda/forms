import { logging, browser, element, by } from 'protractor';
import { TemplatePage } from './template.po';
import { protractor } from 'protractor/built/ptor';

const orignFn = browser.driver.controlFlow().execute;
browser.driver.controlFlow().execute = function stop() {
    const args = arguments;
    orignFn.call(browser.driver.controlFlow(), () => {
        return protractor.promise.delayed(100);
    });
    return orignFn.apply(browser.driver.controlFlow(), args);
};

describe('Ejercicio 4', () => {
    let page: TemplatePage;
    beforeEach(() => {
        page = new TemplatePage();
    });

    // it('Prueba del arreglo', async () => {
    //     const array = ['jorge', 'jorge@', 'jorge@ho'];
    //     page.navigateToTemplatePage();
    //     await browser.waitForAngular();
    //     // tslint:disable-next-line: prefer-for-of
    //     for ( let i = 0; i < array.length; i++ ){
    //       await page.setMail(array[i]);
    //     }
    //   });
    it('Debe seleccionar Cuba', async () => {
        await page.navigateToTemplatePage();
        await browser.waitForAngular();
        // await page.getCountry
        const pais = element(by.cssContainingText('opcion', 'cuba'));
        expect (pais.getText()).toEqual('cuba');
    });

    afterEach(async () => { // Este método se ejecuta despues de cada prueba
        // Revisa si no hay errores severos emitidos por el navegador
        const logs = await browser.manage().logs().get(logging.Type.BROWSER);
        expect(logs).not.toContain(jasmine.objectContaining({
            level: logging.Level.SEVERE,
        } as logging.Entry));
    });
});
