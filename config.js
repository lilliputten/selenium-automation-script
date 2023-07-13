// XPath matchers for fields...
const elementsXPaths = {
  cFirstName: '//input[contains(@id, ".first-name")]', // 'FRANCISKO BAREND',
  cSurname: '//input[contains(@id, ".last-name")]', // 'DU PLESSIS',
  dDateOfBirth: '//input[contains(@id, ".date-of-birth")]', // '1957-12-18' -> '18/12/1957' (see `prepareDataValue` function below)
  // ...etc...
  // cAddress1, // '48 Monivae Circuit',
  // cAddress2, // 'Eagleby',
  // cPostCode, // '4207',
  // cTelephone2, // '0472880786',
  // cTFN, // '892763917',
  // ACCNUM, // 'HASTOBE9DIGITS',
  // AdressOnATO, // 'need to save',
  // SuperMember, // 'id',
  // Email, // 'email'
};

module.exports = {
  // XPath matchers for fields...
  elementsXPaths,

  // Use first item to detect page ready status...
  testXPath: Object.values(elementsXPaths)[0],

  // Json data file. Expecting scheme `{ list: [ ... ] } `
  dataFileName: './data.json',

  // Target site url
  siteUrl: 'https://mol.hostplus.com.au/mjol',

  // Set window size
  windowWidth: 800, // 1024
  windowHeight: 600, // 768
};
