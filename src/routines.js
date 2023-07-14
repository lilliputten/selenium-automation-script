/* eslint-disable no-console */

const { Builder, Browser, By } = require('selenium-webdriver');

const {
  // waitPromise,
  scrollToElement,
  clickCheckbox,
  setSelect,
} = require('./utils.js'); // Some utils (unused)

const {
  // Debug mode
  isDebug,

  // Fields' elements...
  elements,

  // Use first item to detect page ready status...
  testXPath,

  // Json data file. Expecting scheme `{ list: [ ... ] } `
  dataFileName,

  // Target site url
  siteUrl,

  // Set window size
  windowWidth,
  windowHeight,

  // Behavior options...
  defaultClick,
  defaultClear,
} = require('./config.js');

function prepareDataValue(dataId, value) {
  // dDateOfBirth should be reverted: '1957-12-18' -> '18-12-1957',
  switch (dataId) {
    case 'dDateOfBirth': {
      // TODO: To use split and reverse array?
      return value.replace(/^(\d+)-(\d+)-(\d+)$/, '$3/$2/$1');
    }
    case 'cTelephone2': {
      const telStr = String(value);
      // NOTE: Remove leading zero for domestic australian numbers...
      // @see https://en.wikipedia.org/wiki/Telephone_numbers_in_Australia
      if (telStr.length === 10 && telStr.startsWith('04')) {
        return telStr.substring(1);
      }
      break;
    }
  }
  return value;
}

async function processDataFieldByXPath(driver, dataId, xPath, value) {
  try {
    const elData = elements[dataId];
    const { click, clear } = elData;
    const preparedValue = prepareDataValue(dataId, value);
    const valueLogStr =
      '"' + value + '"' + (preparedValue !== value ? ' ("' + preparedValue + '")' : '');
    console.log('Trying to fill the element "' + dataId + '" with value ' + valueLogStr);
    const el = driver.findElement(By.xpath(xPath));
    if (!el) {
      throw new Error('No element defined for el');
    }
    console.log('Element "' + dataId + '" found! Trying to fill it...');
    // Scroll to the element...
    // await driver.executeScript('arguments[0].scrollIntoView(true);', el);
    await scrollToElement(driver, el);
    // Click...
    if (defaultClick || click) {
      await el.click();
    }
    // Clear...
    if (defaultClear || clear) {
      await el.clear();
    }
    // Fill the field...
    await el.sendKeys(preparedValue);
    console.log('Element "' + dataId + '" has filled with value "' + preparedValue + '"');
  } catch (err) {
    console.error('[processDataField]', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

async function processDataField(driver, dataId, value) {
  try {
    const elData = elements[dataId];
    const xPath = elData.xPath;
    if (!xPath) {
      throw new Error('Not defined xpath for data id "' + dataId + '"');
    }
    const xPathsList = Array.isArray(xPath) ? xPath : [xPath];
    for (const singleXPath of xPathsList) {
      await processDataFieldByXPath(driver, dataId, singleXPath, value);
    }
  } catch (err) {
    console.error('[processDataField]', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

// Open manual address section -- Click 'I can't find my address' checkbox...
async function selectTitle(driver, _dataItem) {
  const value = 'Mr'; // TODO: Get value from dataItem?
  try {
    // <span data-target-id="title-label--target-id">Title</span>
    const titleXPath = '//span[@data-target-id="title-label--target-id"]';
    await setSelect(driver, titleXPath, value);
  } catch (err) {
    console.error('[selectTitle]', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

// Open manual address section -- Click 'I can't find my address' checkbox...
async function selectGender(driver, _dataItem) {
  const value = 'Male'; // TODO: Get value from dataItem?
  try {
    // <span data-target-id="gender-label--target-id">Gender</span>
    const titleXPath = '//span[@data-target-id="gender-label--target-id"]';
    await setSelect(driver, titleXPath, value);
  } catch (err) {
    console.error('[selectTitle]', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

async function clickManualAddressCheckbox(driver) {
  const xPath = '//input[@type="checkbox" and @value="manualInput"]/following-sibling::label';
  await clickCheckbox(driver, xPath);
}

// Click 'I authorise Hostplus' checkbox...
async function clickAuthoriseCheckbox(driver) {
  const xPath =
    '//input[@type="checkbox" and @name="hasTfnAuthorisation"]/following-sibling::label';
  await clickCheckbox(driver, xPath);
}

// Click 'I understand and agree' checkbox...
async function clickAgreeCheckbox(driver) {
  const xPath =
    '//input[@type="checkbox" and @name="termsServicePDSCheck"]/following-sibling::label';
  await clickCheckbox(driver, xPath);
}

// Remove header...
async function removeHeader(driver) {
  const xPath = '//div[starts-with(@class,"Headerstyle__HeaderWrapper")]';
  console.log('removeHeader');
  try {
    const el = await driver.findElement(By.xpath(xPath));
    await driver.executeScript('arguments[0].remove();', el);
  } catch (err) {
    console.error('[removeHeader]', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

async function atRecordStart(driver, dataItem) {
  console.log('Do tasks at record processing start:', dataItem);
  try {
    await clickManualAddressCheckbox(driver);
    await selectTitle(driver, dataItem);
    await selectGender(driver, dataItem);
  } catch (err) {
    console.error('[atRecordStart]', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

async function atRecordEnd(driver, dataItem) {
  console.log('Do tasks at record processing start:', dataItem);
  try {
    await clickAuthoriseCheckbox(driver);
    await clickAgreeCheckbox(driver);
  } catch (err) {
    console.error('[atRecordEnd]', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

async function processRecord(dataItem) {
  console.log('Trying to fill the data:', dataItem);
  // return await waitPromise(2000);
  const driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    // TODO: To reuse single browser window?
    console.log('Waiting for content to be ready...');
    await driver.manage().window().setRect({ width: windowWidth, height: windowHeight });
    await driver.get(siteUrl);
    // Do initial tasks...
    await removeHeader(driver);
    // Waiting until the content has rendered...
    const testXPathValue = Array.isArray(testXPath) ? testXPath[0] : testXPath;
    await driver.wait(() => driver.findElements(By.xpath(testXPathValue)), 5000);
    console.log('Content is ready.');
    // Start...
    await atRecordStart(driver, dataItem);
    console.log('Starting to fill the data...');
    // Start to fill the fields (synchronous)...
    for (const dataId of Object.keys(elements)) {
      const value = dataItem[dataId] || '';
      await processDataField(driver, dataId, value);
    }
    // Final actions..
    await atRecordEnd(driver, dataItem);
    // TODO: Find submit button and click it?
  } catch (err) {
    console.error('[processRecord]', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  } finally {
    if (!isDebug) {
      // NOTE: Don't close the browser if we want to show the results.
      await driver.quit();
    }
  }
}

async function processData() {
  try {
    // Load data file. Expecting scheme `{ list: [ ... ] } `
    const fileData = require(dataFileName);
    const dataList = fileData.list;
    // Option 1: Synchornous processing (item after item)...
    for (const dataItem of dataList) {
      await processRecord(dataItem);
    }
    /* // Option 2: Asynchornous processing (all the browsers starting at once)...
     * dataList.forEach(processRecord);
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
