// XPath matchers for fields...
const elements = {
  cFirstName: {
    // 'FRANCISKO BAREND'
    xPath: '//input[contains(@id, ".first-name")]',
  },
  cSurname: {
    // 'DU PLESSIS'
    xPath: '//input[contains(@id, ".last-name")]',
  },
  dDateOfBirth: {
    // '1957-12-18' -> '18/12/1957' (see `prepareDataValue` function below)
    xPath: '//input[contains(@id, ".date-of-birth")]',
  },
  cAddress1: {
    // '48 Monivae Circuit'
    xPath: '//input[@name="postalAddress.addressLine1"]',
  },
  cAddress2: {
    // 'Eagleby'
    xPath: '//input[@name="postalAddress.addressLine2"]',
  },
  cPostCode: {
    // '4207'
    xPath: '//input[@name="postalAddress.postCode"]',
  },
  cTelephone2: {
    // '0472880786' -> '472880786' (remove leading zero in prepareDataValue)
    xPath: '//input[starts-with(@class, "form-control") and @type="tel"]',
    // clear: true,
  },
  cTFN: {
    // '892763917'
    xPath: '//input[contains(@id, ".tfn-prompt")]',
    clear: true,
  },
  /*
  ACCNUM: {
    // 'HASTOBE9DIGITS'
    xPath: '//input[contains(@id, ".")]',
  },
  AdressOnATO: {
    // 'need to save'
    xPath: '//input[contains(@id, ".")]',
  },
  SuperMember: {
    // 'id'
    xPath: '//input[contains(@id, ".")]',
  },
  */
  Email: {
    // 'email@domain.com'
    xPath: [
      '//input[contains(@id, ".email-address")]',
      '//input[contains(@id, ".confirm-email-address")]',
    ],
  },
};

// First random element's xpath (to detect document readyness status)...
const testXPath = Object.values(elements)[0].xPath;

module.exports = {
  // Debug mode
  isDebug: true,

  // XPath matchers for fields...
  elements,

  // XPath of item to detect page ready status...
  testXPath, // : Object.values(elements)[0].xpath,

  // Json data file. Expecting scheme `{ list: [ ... ] } `
  dataFileName: './data1.json',

  // Target site url
  siteUrl: 'https://mol.hostplus.com.au/mjol',

  // Set window size
  windowWidth: 800, // 1024
  windowHeight: 600, // 768

  // Behavior options...
  defaultClick: true,
  defaultClear: true,
};
