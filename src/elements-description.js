// Generic elements descriptions with XPath matchers for data fields (processing all at once)...
const elementsDescription = {
  cFirstName: {
    // 'FRANCISKO BAREND'
    xPath: '//input[contains(@id,".first-name")]',
  },
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
  Super_Email: {
    // This field value comes from attributes file (see `attributesFileName` below).
    // Previous id: `Email` (from the data file).
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
const testXPath =
  Object.values(elementsDescription)[0]?.xPath || '//input[contains(@id,".first-name")]';

module.exports = {
  // XPath matchers for fields...
  elementsDescription,

  // XPath of item to detect page ready status...
  testXPath,
};
