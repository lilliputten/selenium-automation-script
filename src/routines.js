/* eslint-disable no-console */

const { Key, Builder, Browser, By } = require('selenium-webdriver');

const {
  // Debug mode
  // isDebug,
  debugOmitOtherFields,

  // Generic behavior...
  closeWindowWhenFinished,
  clickNextButton,

  // Fields' elements...
  elements,

  // Use first item to detect page ready status...
  testXPath,

  // Target site url
  siteUrl,

  // Set window size
  windowWidth,
  windowHeight,

  // Behavior options...
  defaultClick,
  defaultClear,
  attemptsToFillComplexAddress,
} = require('./config.js');

const {
  waitPromise,
  scrollToElement,
  clickCheckbox,
  setSelect,
  clickRadioGroupItem,
  debugHighlightElement,
  generateRandomAddressCode,
  // generateRandomPassword,
} = require('./utils.js'); // Some utils (unused)

const { loadAttributesList, loadDataList } = require('./data-files-support.js');
const { prepareDataFieldValue } = require('./data-helpers.js');

async function processDataFieldByXPath(driver, dataId, xPath, value) {
  const elData = elements[dataId];
  const { click, clear, optional } = elData;
  try {
    const preparedValue = prepareDataFieldValue(dataId, value);
    const valueLogStr =
      '"' + value + '"' + (preparedValue !== value ? ' ("' + preparedValue + '")' : '');
    // prettier-ignore
    console.log('[processDataFieldByXPath] Trying to fill the element "' + dataId + '" with value ' + valueLogStr);
    const el = driver.findElement(By.xpath(xPath));
    if (!el) {
      throw new Error('No element defined for el');
    }
    console.log('[processDataFieldByXPath] Element "' + dataId + '" found! Trying to fill it...');
    // Scroll to the element...
    await scrollToElement(driver, el, optional);
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
    // prettier-ignore
    console.log('[processDataFieldByXPath] Element "' + dataId + '" has filled with value "' + preparedValue + '"');
  } catch (err) {
    if (optional) {
      console.log('[processDataField] Optional error:', err);
    } else {
      console.error('[processDataField] Error:', err);
      debugger; // eslint-disable-line no-debugger
      throw err; // Re-throw...
    }
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
    console.error('[processDataField] Error', err);
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
    console.error('[selectTitle] Error', err);
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
    console.error('[selectTitle] Error', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

/* // UNUSED: clickManualAddressCheckbox
 * async function clickManualAddressCheckbox(driver) {
 *   const xPath = '//input[@type="checkbox" and @value="manualInput"]/following-sibling::label';
 *   await clickCheckbox(driver, xPath);
 * }
 */

// Fill address field...
async function fillComplexAddressElementWithValue(driver, inputXPath, value) {
  try {
    // TODO: Clear field
    const el = await driver.findElement(By.xpath(inputXPath));
    /* console.log('[fillComplexAddressElementWithValue] Trying to scroll to field', {
     *   value,
     *   inputXPath,
     *   el,
     * });
     */
    await scrollToElement(driver, el);
    console.log('[fillComplexAddressElementWithValue] Trying to fill with value:', value);
    await el.clear();
    // await waitPromise(5000);
    await el.sendKeys(value);
    // Wait some time to let the application to find some data in the internet
    // TODO: To determine somehow (?) when the search is finished? (Try to found opened popup with options in document?)
    // Send final enter and escape...
    await waitPromise(1000);
    // console.log('[fillComplexAddressElementWithValue] Sending enter');
    await el.sendKeys(Key.ENTER);
    // Scroll back to retain element focus (it could be lost after value update)...
    // console.log('[fillComplexAddressElementWithValue] Re-focusing');
    await scrollToElement(driver, el);
    try {
      // Send escape to force update the field (don't throw error if it's impossible: it's optional)...
      // console.log('[fillComplexAddressElementWithValue] Sending escape');
      await el.sendKeys(Key.ESCAPE);
    } catch (_e) {
      // NOOP
    }
  } catch (err) {
    console.error('[fillComplexAddressElementWithValue] Error', err, {
      value,
      inputXPath,
    });
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

/** @return boolean */
async function waitNonEmptyComplexAddressElement(driver, containerXPath) {
  const valueXPath =
    containerXPath +
    '//div[contains(@class,"addressAutocomplete__single-value") and string-length(text()) > 0]';
  try {
    // prettier-ignore
    console.log('[waitNonEmptyComplexAddressElement] Trying to find displayed found address element', {
      valueXPath,
    });
    const result = await driver.wait(() => driver.findElement(By.xpath(valueXPath)), 1000);
    console.log('[waitNonEmptyComplexAddressElement] Element successfully found', {
      result,
    });
    // Element found
    return true;
  } catch (err) {
    console.log('[waitNonEmptyComplexAddressElement] Element not found', {
      err,
      valueXPath,
      containerXPath,
    });
    // debugger; // eslint-disable-line no-debugger
    // Element not found
    return false;
  }
}

// Fill address field...
async function fillComplexAddress(driver, dataItem) {
  // Address field wrapper
  const containerXPath = '//div[contains(@class,"AddressAutocompleteContainer")]';
  // Input xpath
  const inputXPath =
    containerXPath + '//input[@type="text" and @id="postalAddress-AddressAutocomplete"]';
  const { cAddress1, cAddress2, cPostCode } = dataItem;
  // Let's try to fill field with real value at first...
  // Eg: value = 586 Stockleigh Road Stockleigh
  let value = [cAddress1, cAddress2, cPostCode].filter(Boolean).join(' ');
  // let value = '12345'; // DEBUG: Check value for 'random addresses'
  // let value = 'XXX'; // DEBUG: Check unsolvable address (should be choosed some random address)
  try {
    console.log('[fillComplexAddress] Trying to fill complex address field with data:', value, {
      value,
      cAddress1,
      cAddress2,
      cPostCode,
    });
    // Starting filling cycle: using real value for iteration and then if
    // adrress couldn't be substituted automatically, will try to fill with
    // random 'addresses' (see `generateRandomAddressCode`).
    let count = 0;
    let result = false;
    while (!result && count < attemptsToFillComplexAddress) {
      if (count) {
        // Not initial cycle: get random value
        value = generateRandomAddressCode();
      }
      count++;
      console.log('[fillComplexAddress] Start iteration', count, '("' + value + '")');
      await fillComplexAddressElementWithValue(driver, inputXPath, value);
      result = await waitNonEmptyComplexAddressElement(driver, containerXPath);
      // prettier-ignore
      console.log('[fillComplexAddress] Check iteration', count, '("' + value + '") result:', result ? 'success' : 'failure');
      // Else going to the next iteration...
    }
    if (!result) {
      // Can't fill address: throw an error...
      throw new Error('Can not fill the address field for ' + count + ' times');
    }
    // Else succesfully return
  } catch (err) {
    console.error('[fillComplexAddress] Error', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
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

// Click 'Would you like to have insurance cover?' radio group 'No' item...
async function clickInsuranceCoverRadioGroupItem(driver) {
  const radioGroupText = 'Would you like to have insurance cover?';
  const radioGroupItemText = 'No';
  try {
    // prettier-ignore
    // console.log('[clickInsuranceCoverRadioGroupItem] Trying to click radio group "' + radioGroupText + '" item "' + radioGroupItemText + '"');
    await clickRadioGroupItem(driver, radioGroupText, radioGroupItemText);
  } catch (err) {
    console.error('[clickInsuranceCoverRadioGroupItem] Error', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

// Remove header...
async function removeHeader(driver) {
  const xPath = '//div[starts-with(@class,"Headerstyle__HeaderWrapper")]';
  console.log('[removeHeader] Removing page header');
  try {
    const el = await driver.findElement(By.xpath(xPath));
    await driver.executeScript('arguments[0].remove();', el);
  } catch (err) {
    console.error('[removeHeader] Error', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

async function atRecordProcessingStart(driver, dataItem) {
  console.log('[atRecordProcessingStart] Do tasks at record processing start:', dataItem);
  try {
    if (!debugOmitOtherFields) {
      // await clickManualAddressCheckbox(driver); // UNUSED: Using automatic address field (`fillComplexAddress`)
      // Gender-dependent fields (it's possible to get and fill them from input data)...
      await selectTitle(driver, dataItem);
      await selectGender(driver, dataItem);
      // Other fields...
      await clickInsuranceCoverRadioGroupItem(driver);
      await fillComplexAddress(driver, dataItem);
    }
  } catch (err) {
    console.error('[atRecordProcessingStart] Error', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

async function atRecordProcessingEnd(driver, dataItem) {
  console.log('[atRecordProcessingEnd] Do tasks at record processing start:', dataItem);
  try {
    if (!debugOmitOtherFields) {
      await clickAuthoriseCheckbox(driver);
      await clickAgreeCheckbox(driver);
    }
  } catch (err) {
    console.error('[atRecordProcessingEnd] Error', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

async function findAndClickNextButton(driver) {
  const xPath =
    '//button[@type="submit" and contains(@data-target-id,"registration--form-button")]';
  console.log('[findAndClickNextButton] Trying to find Next button...', {
    xPath,
  });
  try {
    const el = await driver.findElement(By.xpath(xPath));
    await scrollToElement(driver, el);
    if (clickNextButton) {
      await el.click();
    } else {
      await debugHighlightElement(driver, el);
    }
  } catch (err) {
    console.error('[findAndClickNextButton] Error', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  }
}

async function processRecord(dataItem) {
  console.log('[processRecord] Trying to fill the data:', dataItem);
  // return await waitPromise(2000);
  const driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    // TODO: To reuse single browser window?
    console.log('[processRecord] Waiting for content to be ready...');
    await driver.manage().window().setRect({ width: windowWidth, height: windowHeight });
    await driver.get(siteUrl);
    // Do initial tasks...
    await removeHeader(driver);
    // Waiting until the content has rendered...
    const testXPathValue = Array.isArray(testXPath) ? testXPath[0] : testXPath;
    if (testXPathValue) {
      await driver.wait(() => driver.findElements(By.xpath(testXPathValue)), 5000);
    }
    console.log('[processRecord] Content is ready');
    // Start...
    await atRecordProcessingStart(driver, dataItem);
    console.log('[processRecord] Starting to fill the data...');
    // Start to fill the fields (synchronous)...
    for (const dataId of Object.keys(elements)) {
      const value = dataItem[dataId] || '';
      await processDataField(driver, dataId, value);
    }
    // Final actions..
    await atRecordProcessingEnd(driver, dataItem);
    await findAndClickNextButton(driver);
    // TODO: Find submit button and click it?
  } catch (err) {
    console.error('[processRecord]: Error', err);
    debugger; // eslint-disable-line no-debugger
    throw err; // Re-throw...
  } finally {
    if (closeWindowWhenFinished) {
      // NOTE: Don't close the browser if we want to show the results.
      await driver.quit();
    }
  }
}

async function processData() {
  try {
    // Load emails and passwords
    const attrsList = loadAttributesList();
    // Load data file. Expecting scheme `{ list: [ ... ] } `
    // const fileData = require(dataFileName);
    const dataList = loadDataList(); //fileData.list;
    console.log('[processData] Start', {
      attrsList,
      dataList,
    });
    debugger;
    // Option 1: Synchornous processing (item after item)...
    for (const dataItem of dataList) {
      // TODO: Skip records with filled SuperMember field
      // const attrNo = Math.floor(Math.random() * attrsList.length);
      // const attrData = attrsList[attrNo];
      await processRecord(dataItem);
    }
    /* // Option 2: Asynchornous processing (all the browsers starting at once)...
     * dataList.forEach(processRecord);
     */
  } catch (err) {
    console.error('[processData] Error:', err);
    debugger; // eslint-disable-line no-debugger
  }
}

// NOTE: Use `processData()` to start the process.
module.exports = {
  processData,
};
