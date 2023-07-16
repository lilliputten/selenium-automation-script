const path = require('path');

// DEBUG: Debug mode (only for developing purposes)
const isDebug = true;

const srcPath = path.resolve(__dirname);
const rootPath = path.resolve(path.dirname(path.basename(srcPath)));

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

  // Length of genreated passwords...
  passwordLength: 10,

  // Json data file. Expecting scheme `{ records: [ ... ] } `
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

  // Behavior options (for `elementsDescription` items)...
  defaultClick: true,
  defaultClear: true,
};
