const { Builder, Browser, By, Key, until } = require('selenium-webdriver');

const dataFileName = './data.json';
// const dataFileName = './data1.json';
const siteUrl = 'https://mol.hostplus.com.au/mjol';

async function waitPromise(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

async function processDataItem(data) {
  const {
    cFirstName, // 'FRANCISKO BAREND',
    cSurname, // 'DU PLESSIS',
    dDateOfBirth, // '1957-12-18',
    cAddress1, // '48 Monivae Circuit',
    cAddress2, // 'Eagleby',
    cPostCode, // '4207',
    cTelephone2, // '0472880786',
    cTFN, // '892763917',
    ACCNUM, // 'HASTOBE9DIGITS',
    AdressOnATO, // 'need to save',
    SuperMember, // 'id',
    Email, // 'email'
  } = data;
  console.log('Trying to fill the data:', data);
  return;
  const driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    const actions = driver.actions();
    // await driver.manage().window().setRect({ width: 1024, height: 768 })
    await driver.get(siteUrl);
    const elId = 'mjol-form.personal-details.personal-details-input-wrapper.personal-details-sub-layout-line-1.first-name';
    await driver.wait(() => {
      // return driver.isElementPresent(By.id(elId));
      return driver.findElements(By.id(elId));
    }, 5000);
    console.log('Trying to fill the cFirstName:', cFirstName);
    const el = driver.findElement(By.id(elId));
    if (!el) {
      throw new Error('No element defined for el');
    }
    console.log('Element cFirstName found! Trying to fill:', cFirstName);
    await actions.move({ origin: el }).click().perform();
    // await el.click()
    await el.sendKeys(cFirstName);
  } catch(err) {
    console.error('Error', err);
    debugger;
  } finally {
    // await driver.quit();
  }

}

async function processData() {
  const fileData = require(dataFileName);
  const dataList = fileData.list;
  dataList.forEach(processDataItem);
}

processData();
// doWork();
