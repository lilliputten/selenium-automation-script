const { Builder, Browser, By, Key, until } = require('selenium-webdriver');

function processDataItem(data) {
  console.log('data', data);
}

function processData() {
  const dataFile = require('./data.json');
  const dataList = dataFile.list;
  dataList.forEach(processDataItem);
}

async function doWork() {
  let driver = await new Builder().forBrowser(Browser.FIREFOX).build();
  try {
    await driver.get('https://www.google.com/ncr');
    await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('webdriver - Google Search'), 1000);
    await driver.wait(() => { }, 5000);
  } finally {
    await driver.quit();
  }
}


processData();
// doWork();
