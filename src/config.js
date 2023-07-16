const path = require('path');

// DEBUG: Debug mode (only for developing purposes)
const isDebug = true;

// const tagFormat = 'yyMMdd-HHmm';
// const timeFormat = 'yyyy.MM.dd, HH:mm zzz'; // With time zone

const srcPath = path.resolve(__dirname);
const rootPath = path.resolve(path.dirname(path.basename(srcPath)));

// XPath matchers for regular fields (processing all at once)...
const elements = {
  cFirstName: {
    // 'FRANCISKO BAREND'
    xPath: '//input[contains(@id,".first-name")]',
  },
  /* // XXX
   */
  cSurname: {
    // 'DU PLESSIS'
    xPath: '//input[contains(@id,".last-name")]',
  },
  dDateOfBirth: {
    // '1957-12-18' -> '18/12/1957' (see `prepareDataValue` function below)
    xPath: '//input[contains(@id,".date-of-birth")]',
  },
  cTelephone2: {
    // '0472880786' -> '472880786' (remove leading zero in prepareDataValue)
    xPath: '//input[starts-with(@class,"form-control") and @type="tel"]',
    // clear: true,
  },
  cTFN: {
    // '892763917'
    xPath: '//input[contains(@id,".tfn-prompt")]',
    clear: true,
  },
  Email: {
    // 'email@domain.com'
    xPath: [
      '//input[contains(@id,".email-address")]',
      '//input[contains(@id,".confirm-email-address")]',
    ],
  },
  /* // UNUSED: Address data, used complex method `fillComplexAddress`
  cPostCode: {
    // '4207'
    xPath: '//input[@name="postalAddress.postCode"]',
    optional: true,
  },
  cAddress1: {
    // '48 Monivae Circuit'
    xPath: '//input[@name="postalAddress.addressLine1"]',
  },
  cAddress2: {
    // 'Eagleby'
    xPath: '//input[@name="postalAddress.addressLine2"]',
  },
  // Other data:
  ACCNUM: {
    // 'HASTOBE9DIGITS'
    xPath: '//input[contains(@id,".")]',
  },
  AdressOnATO: {
    // 'need to save'
    xPath: '//input[contains(@id,".")]',
  },
  SuperMember: {
    // 'id'
    xPath: '//input[contains(@id,".")]',
  },
  */
};

// First random element's xpath (to detect document readyness status)...
const testXPath = Object.values(elements)[0]?.xPath || '//input[contains(@id,".first-name")]';

module.exports = {
  // DEBUG: Debug mode (only for developing purposes)
  isDebug,
  // debugOmitOtherFields: isDebug, // Omit some fields for debugging purposes

  // Generic behavior (mostly for debug purposes)...
  closeWindowWhenFinished: !isDebug, // Don't close browser window with filled form
  clickNextButton: !isDebug, // Click 'Next' button when form has filled

  // Paths...
  srcPath,
  rootPath,

  // XPath matchers for fields...
  elements,

  // XPath of item to detect page ready status...
  testXPath,

  // Length of genreated passwords...
  passwordLength: 10,

  // Json data file. Expecting scheme `{ list: [ ... ] } `
  dataFileName: 'data/data.json',

  // Text file with emails and passwords name
  attributesFileName: 'data/attributes.txt',

  // Target site url
  siteUrl: 'https://mol.hostplus.com.au/mjol',

  // Set window size
  windowWidth: 800, // 1024
  windowHeight: 600, // 768

  // Attempts count to fill complex address field
  attemptsToFillComplexAddress: 50,

  // Behavior options (for `elements` items)...
  defaultClick: true,
  defaultClear: true,
};
