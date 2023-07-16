/* eslint-disable no-console */

const { By } = require('selenium-webdriver');

async function waitPromise(timeout) {
  // Other soultion: `driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);`
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
  console.log('[clickCheckbox] Click checkbox with xPath:', xPath);
  try {
    const el = await driver.findElement(By.xpath(xPath));
    await scrollToElement(driver, el);
    await el.click();
  } catch (err) {
    console.error('[clickCheckbox] Error', err, { xPath });
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

async function setSelect(driver, titleXPath, value) {
  console.log('[setSelect] Set select (' + titleXPath + '): start, value:', value);
  try {
    // Find and open parent select itself...
    const selectXPath =
      titleXPath + '/../../../../div[starts-with(@class,"CtrlHolderstyle__FieldContents")]';
    const el = await driver.findElement(By.xpath(selectXPath));
    await scrollToElement(driver, el);
    await el.click();
    // Find and click item inside opened select popup (error will be thrown if it hadn't found)...
    const itemEl = await el.findElement(By.xpath('//*[text()="' + value + '"]'));
    console.log('[setSelect] Set select (' + titleXPath + '):', value, '-> found item', { itemEl });
    await itemEl.click();
  } catch (err) {
    console.error('[setSelect] Error', err, { titleXPath, value });
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
    await scrollToElement(driver, el);
    await el.click();
  } catch (err) {
    console.error('[clickRadioGroupItem] Error', err, {
      radioGroupText,
      radioGroupItemText,
      xPath,
    });
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

async function debugHighlightElement(driver, el, color = 'red', width = 2) {
  // Stylize element with colored border
  await driver.executeScript(
    'arguments[0].setAttribute("style", "border: ' + width + 'px solid ' + color + ' !important")',
    el,
  );
}

/** Get 5 random digits (in string), values from 10000 to 99999.
 * @return string
 */
function getRandomAddressValue() {
  const numMin = 10000;
  const numMax = 99999;
  const numRange = numMax - numMin;
  const randValue = numMin + Math.round(Math.random() * numRange);
  return String(randValue);
}

module.exports = {
  waitPromise,
  scrollToElement,
  clickCheckbox,
  setSelect,
  clickRadioGroupItem,
  debugHighlightElement,
  getRandomAddressValue,
};
