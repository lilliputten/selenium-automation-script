// DEBUG: Debug mode (only for developing purposes)
const isDebug = true;

// XPath matchers for fields...
const elements = {
  cFirstName: {
    // 'FRANCISKO BAREND'
    xPath: '//input[contains(@id, ".first-name")]',
  },
  /* // XXX
  cSurname: {
    // 'DU PLESSIS'
    xPath: '//input[contains(@id, ".last-name")]',
  },
  dDateOfBirth: {
    // '1957-12-18' -> '18/12/1957' (see `prepareDataValue` function below)
    xPath: '//input[contains(@id, ".date-of-birth")]',
  },
  cPostCode: {
    // '4207'
    xPath: '//input[@name="postalAddress.postCode"]',
    optional: true,
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
  Email: {
    // 'email@domain.com'
    xPath: [
      '//input[contains(@id, ".email-address")]',
      '//input[contains(@id, ".confirm-email-address")]',
    ],
  },
  */
  /* // UNUSED: Address data, used complex method `fillComplexAddressa
  <input autocapitalize="none" autocomplete="off" autocorrect="off"
    id="postalAddress-AddressAutocomplete" spellcheck="false" tabindex="0"
    type="text" aria-autocomplete="list" style="box-sizing: content-box; width:
    2px; background: 0px center; border: 0px none; font-size: inherit; opacity:
    1; outline: 0px; padding: 0px; color: inherit;" value="">
  586 Stockleigh Road Stockleigh

  cAddress1: {
    // '48 Monivae Circuit'
    xPath: '//input[@name="postalAddress.addressLine1"]',
  },
  cAddress2: {
    // 'Eagleby'
    xPath: '//input[@name="postalAddress.addressLine2"]',
  },
  */
  /* // NOTE: Unused fields:
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
};

// First random element's xpath (to detect document readyness status)...
const testXPath = Object.values(elements)[0]?.xPath || '//input[contains(@id, ".first-name")]';

module.exports = {
  // DEBUG: Debug mode (only for developing purposes)
  isDebug,
  debugOmitOtherFields: isDebug,

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
