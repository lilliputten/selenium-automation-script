<!--
@since 2023.07.15, 00:00
@changed 2023.07.17, 01:53
-->

# selenium-automation-script

Sample selenium automation script.


## Run

Run command: `npm run start` or `node automation-script.js`.


## Modules

Main module: `automation-script.js`.

Code: `src/routines.js`.


## Configuration parameters

Configuration data stored in `src/config.js`.

- dataFileName (`data/data.json`): Json data file. Expecting scheme `{ list: [ ... ] } `.
- attributesFileName (`data/attributes.txt`): Attributes data file. Expecting line format: `<email>|<password>`.
- siteUrl (`'https://mol.hostplus.com.au/mjol'`): Target site url.
- windowWidth (800), windowHeight (600): Window size.
- elements: The list of XPath matchers for fields in data file (format: `{ [<fieldId>]: { xPath: <xpathQuery> } }`).
- testXPath: XPath for element used to detect page loaded status (by default is the first value from `elementsXPaths`).

See `src/config.js` for all parameters.

## Data files

Data files should be located in `data` folder. Those files haven't included in repository.

You should put your own files before start work.

See `.SAMPLE` files for format reference (those files used for tests).

- `data/data.json`: Main records list. Expecting dile scheme: `{ list: [ ... ] } `. See `data/data.json.SAMPLE`.
- `data/attributes.txt`: Attributes data file. Contains extra data for random fileds filling. Expecting line format: `<email>|<password>`. See `data/attributes.txt.SAMPLE`.
