/* eslint-disable no-console */

const { Builder, Browser, By } = require('selenium-webdriver');

// const { waitPromise } = require('./utils.js'); // Some utils (unused)

const {
  // XPath matchers for fields...
  elementsXPaths,

  // Use first item to detect page ready status...
  testXPath,

  // Json data file. Expecting scheme `{ list: [ ... ] } `
  dataFileName,

  // Target site url
  siteUrl,

  // Set window size
  windowWidth,
  windowHeight,
} = require('./config.js');

function prepareDataValue(dataId, value) {
  // dDateOfBirth should be reverted: '1957-12-18' -> '18-12-1957',
  if (dataId === 'dDateOfBirth') {
    // TODO: To use split and reverse array?
    value = value.replace(/^(\d+)-(\d+)-(\d+)$/, '$3/$2/$1');
  }
  return value;
}

async function processDataField(driver, dataId, value) {
  try {
    const elXPath = elementsXPaths[dataId];
    if (!elXPath) {
      throw new Error('Not defined xpath for data id "' + dataId + '"');
    }
    const preparedValue = prepareDataValue(dataId, value);
    const valueLogStr =
      '"' + value + '"' + (preparedValue !== value ? ' ("' + preparedValue + '")' : '');
    console.log('Trying to fill the element "' + dataId + '" with value ' + valueLogStr);
    const el = driver.findElement(By.xpath(elXPath));
    if (!el) {
      throw new Error('No element defined for el');
    }
    console.log('Element "' + dataId + '" found! Trying to fill it...');
    // Scroll to the element...
    driver.executeScript('arguments[0].scrollIntoView(true);', el);
    await el.sendKeys(preparedValue);
    console.log('Element "' + dataId + '" has filled with value "' + preparedValue + '"');
  } catch (err) {
    console.error('[processDataField]', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

async function processDataItem(dataItem) {
  console.log('Trying to fill the data:', dataItem);
  // return await waitPromise(2000);
  const driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    // TODO: To reuse single browser window?
    console.log('Waiting for content to be ready...');
    await driver.manage().window().setRect({ width: windowWidth, height: windowHeight });
    await driver.get(siteUrl);
    // Waiting until the content has rendered...
    await driver.wait(() => driver.findElements(By.xpath(testXPath)), 5000);
    console.log('Content is ready. Starting to fill the data...');
    // Start to fill the fields (synchronous)...
    for (const dataId of Object.keys(elementsXPaths)) {
      const value = dataItem[dataId] || '';
      await processDataField(driver, dataId, value);
    }
    // Final actions...
    // TODO: Find submit button and click it?
  } catch (err) {
    console.error('[processDataItem]', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  } finally {
    // NOTE: Comment this string if you want to the result of work on the page.
    await driver.quit();
  }
}

async function processData() {
  try {
    // Load data file. Expecting scheme `{ list: [ ... ] } `
    const fileData = require(dataFileName);
    const dataList = fileData.list;
    // Option 1: Synchornous processing (item after item)...
    for (const dataItem of dataList) {
      await processDataItem(dataItem);
    }
    /* // Option 2: Asynchornous processing (all the browsers starting at once)...
     * dataList.forEach(processDataItem);
     */
  } catch (err) {
    console.error('[processData]', err);
    debugger; // eslint-disable-line no-debugger
  }
}

// NOTE: Use `processData()` to start the process.
module.exports = {
  processData,
};
