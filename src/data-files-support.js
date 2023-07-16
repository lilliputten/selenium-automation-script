/* eslint-disable no-console */

const path = require('path');
const fs = require('fs');

const { dataFileName, attributesFileName, rootPath } = require('./config.js');

function loadAttributesList() {
  const fn = path.resolve(rootPath, attributesFileName);
  try {
    console.log('[loadData:loadAttributesList] Loading emails and paswords from the file', {
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
    console.log('[loadData:loadAttributesList] Loaded emails and paswords', {
      // pairsList,
      // lines,
      // text,
    });
    return pairsList;
  } catch (err) {
    console.error('[loadData:loadAttributesList] Error:', err, {
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
    console.log('[loadData:loadDataList] Loading emails and paswords from the file', {
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
    const list = data?.list;
    console.log('[loadData:loadDataList] Loaded emails and paswords', {
      // list,
      // data,
    });
    return list;
  } catch (err) {
    console.error('[loadData:loadDataList] Error:', err, {
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
  loadDataList,
};
