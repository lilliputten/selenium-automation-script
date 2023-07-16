/* eslint-disable no-console */

function prepareDataFieldValue(dataId, value) {
  // dDateOfBirth should be reverted: '1957-12-18' -> '18-12-1957',
  switch (dataId) {
    case 'dDateOfBirth': {
      // TODO: To use split and reverse array?
      return value.replace(/^(\d+)-(\d+)-(\d+)$/, '$3/$2/$1');
    }
    case 'cTelephone2': {
      const telStr = String(value);
      // NOTE: Remove leading zero for domestic australian numbers...
      // @see https://en.wikipedia.org/wiki/Telephone_numbers_in_Australia
      if (telStr.length === 10 && telStr.startsWith('04')) {
        return telStr.substring(1);
      }
      break;
    }
  }
  return value;
}

module.exports = {
  prepareDataFieldValue,
};
