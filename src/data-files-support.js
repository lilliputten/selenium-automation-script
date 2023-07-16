/* eslint-disable no-console */

const path = require('path');
const fs = require('fs');

const { dataFileName, attributesFileName, rootPath } = require('./config.js');

function loadAttributesList() {
  const fn = path.resolve(rootPath, attributesFileName);
  try {
    // prettier-ignore
    console.log('[data-files-support:loadAttributesList] Loading emails and paswords from the file', {
      attributesFileName,
      // rootPath,
      fn,
    });
    if (!fs.existsSync(fn)) {
      throw new Error(
        'Not found attributes file "' +
          attributesFileName +
          '". Place your own file or use .SAMPLE version instead.',
      );
    }
    const text = fs.readFileSync(fn, { encoding: 'utf8' });
    const lines = text.split('\n');
    const pairsList = lines.map((s) => s.split('|'));
    console.log('[data-files-support:loadAttributesList] Loaded emails and paswords', {
      // pairsList,
      // lines,
      // text,
    });
    return pairsList;
  } catch (err) {
    console.error('[data-files-support:loadAttributesList] Error:', err, {
      attributesFileName,
      fn,
      rootPath,
    });
    debugger; // eslint-disable-line no-debugger
    throw err;
  }
}

function writeAttributesList(attrsList) {
  const fn = path.resolve(rootPath, attributesFileName);
  try {
    const text = attrsList.map((list) => list.join('|')).join('\n');
    // prettier-ignore
    console.log('[data-files-support:writeAttributesList] Writing emails and paswords into the file', {
      attributesFileName,
      // text,
      fn,
    });
    fs.writeFileSync(fn, text, { encoding: 'utf8' });
    // prettier-ignore
    console.log('[data-files-support:writeAttributesList] Emails and paswords has successfully written');
  } catch (err) {
    console.error('[data-files-support:writeAttributesList] Error:', err, {
      attributesFileName,
      fn,
      rootPath,
    });
    debugger; // eslint-disable-line no-debugger
    throw err;
  }
}

function loadDataList() {
  const fn = path.resolve(rootPath, dataFileName);
  try {
    console.log('[data-files-support:loadDataList] Loading records data from the file', {
      dataFileName,
      // rootPath,
      fn,
    });
    if (!fs.existsSync(fn)) {
      throw new Error(
        'Not found data file "' +
          dataFileName +
          '". Place your own file or use .SAMPLE version instead.',
      );
    }
    const data = require(fn);
    const records = data?.records;
    console.log('[data-files-support:loadDataList] Loaded records data', {
      // records,
      // data,
    });
    return records;
  } catch (err) {
    console.error('[data-files-support:loadDataList] Error:', err, {
      dataFileName,
      fn,
      rootPath,
    });
    debugger; // eslint-disable-line no-debugger
    throw err;
  }
}

function writeDataFile(dataList) {
  const fn = path.resolve(rootPath, dataFileName);
  try {
    const data = { records: dataList };
    const json = JSON.stringify(data, undefined, 2);
    // prettier-ignore
    console.log('[data-files-support:writeDataFile] Writing records data into the file', {
      data,
      dataFileName,
      // json,
      fn,
    });
    fs.writeFileSync(fn, json, { encoding: 'utf8' });
    // prettier-ignore
    console.log('[data-files-support:writeDataFile] Records data has successfully written');
  } catch (err) {
    console.error('[data-files-support:writeDataFile] Error:', err, {
      dataFileName,
      fn,
      rootPath,
    });
    debugger; // eslint-disable-line no-debugger
    throw err;
  }
}

// NOTE: Use `processData()` to start the process.
module.exports = {
  loadAttributesList,
  writeAttributesList,
  loadDataList,
  writeDataFile,
};
