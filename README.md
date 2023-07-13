# selenium-automation-script

Sample selenium automation script.

Run: `npm run start` or `node automation-script.js`.

Main module: `automation-script.js`.

Code: `routines.js`.

See configuration parameters (`config.js`):

- dataFileName (`./data.json`): Json data file. Expecting scheme `{ list: [ ... ] } `.
- siteUrl (`'https://mol.hostplus.com.au/mjol'`): Target site url.
- windowWidth (800), windowHeight (600): Window size.
- elementsXPaths: The list of XPath matchers for fields in data file (format: `{ [filedId]: xpathMatcher }`).
- testXPath: XPath for element used to detect page loaded status (by default is the first value from `elementsXPaths`).
