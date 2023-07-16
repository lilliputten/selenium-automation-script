/* eslint-disable no-console */

const { By } = require('selenium-webdriver');

async function waitPromise(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

async function scrollToElement(driver, el, optional) {
  try {
    await driver.executeScript('arguments[0].scrollIntoView(true);', el);
  } catch (err) {
    if (!optional) {
      console.error('[utils:scrollToElement]: Can not scroll to element', {
        driver,
        el,
        err,
      });
      debugger; // eslint-disable-line no-debugger
    }
  }
}

async function clickCheckbox(driver, xPath) {
  console.log('Click checkbox with xPath:', xPath);
  try {
    const el = await driver.findElement(By.xpath(xPath));
    await scrollToElement(driver, el);
    await el.click();
  } catch (err) {
    console.error('[clickCheckbox]', err, { xPath });
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

async function setSelect(driver, titleXPath, value) {
  console.log('Set select (' + titleXPath + '): start, value:', value);
  try {
    // Find and open parent select itself...
    const selectXPath =
      titleXPath + '/../../../../div[starts-with(@class,"CtrlHolderstyle__FieldContents")]';
    const el = await driver.findElement(By.xpath(selectXPath));
    await scrollToElement(driver, el);
    // await driver.executeScript('arguments[0].setAttribute("style", "border: 3px solid red")', el); // DEBUG
    await el.click();
    // Find and click item inside opened select popup (error will be thrown if it hadn't found)...
    const itemEl = await el.findElement(By.xpath('//*[text()="' + value + '"]'));
    console.log('Set select (' + titleXPath + '):', value, '-> found item', { itemEl });
    // await driver.executeScript('arguments[0].setAttribute("style", "border: 3px solid green")', itemEl); // DEBUG
    await itemEl.click();
  } catch (err) {
    console.error('[setSelect]', err, { titleXPath, value });
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

async function clickRadioGroupItem(driver, radioGroupText, radioGroupItemText) {
  // Find wrapping label element...
  const xPath =
    '//div[text()="' +
    radioGroupText +
    '"]/following-sibling::div//span[text()="' +
    radioGroupItemText +
    '"]/../..';
  try {
    const el = await driver.findElement(By.xpath(xPath));
    // prettier-ignore
    console.log('[clickRadioGroupItem] Trying to click radio group "' + radioGroupText + '" item "' + radioGroupItemText + '"', {
      radioGroupText,
      radioGroupItemText,
      xPath,
      el,
    });
    // debugger;
    await scrollToElement(driver, el);
    await driver.executeScript('arguments[0].setAttribute("style", "border: 3px solid red")', el); // DEBUG
    await el.click();
  } catch (err) {
    console.error('[clickRadioGroupItem]', err, {
      radioGroupText,
      radioGroupItemText,
      xPath,
    });
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

module.exports = {
  waitPromise,
  scrollToElement,
  clickCheckbox,
  setSelect,
  clickRadioGroupItem,
};
