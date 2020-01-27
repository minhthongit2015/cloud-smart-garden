/* eslint-disable no-plusplus */

const Logger = console;

/**
 isNone();              // true
 isNone(null);          // false
 isNone(undefined);     // true
 isNone('');            // false
 isNone([]);            // false
 isNone(function() {}); // false
 */
function isNotSet(object) {
  return object === undefined;
}

/**
 isNone();              // true
 isNone(null);          // true
 isNone(undefined);     // true
 isNone('');            // false
 isNone([]);            // false
 isNone(function() {}); // false
 */
function isNone(object) {
  return object === null || object === undefined;
}

/**
 isEmpty();                 // true
 isEmpty(null);             // true
 isEmpty(undefined);        // true
 isEmpty('');               // true
 isEmpty([]);               // true
 isEmpty({ size: 0});       // true
 isEmpty({});               // false
 isEmpty('Adam Hawkins');   // false
 isEmpty([0,1,2]);          // false
 isEmpty('\n\t');           // false
 isEmpty('  ');             // false
 isEmpty({ size: 1 })       // false
 isEmpty({ size: () => 0 }) // false
 */
function isEmpty(object) {
  if (isNone(object)) {
    return true;
  }

  if (typeof object.size === 'number') {
    return !object.size;
  }

  const objectType = typeof object;

  if (objectType === 'object') {
    const { size } = object;
    if (typeof size === 'number') {
      return !size;
    }
  }

  if (typeof object.length === 'number' && objectType !== 'function') {
    return !object.length;
  }

  if (objectType === 'object') {
    const { length } = object;
    if (typeof length === 'number') {
      return !length;
    }
  }

  return false;
}

/**
 isBlank();                // true
 isBlank(null);            // true
 isBlank(undefined);       // true
 isBlank('');              // true
 isBlank([]);              // true
 isBlank('\n\t');          // true
 isBlank('  ');            // true
 isBlank({});              // false
 isBlank('\n\t Hello');    // false
 isBlank('Hello world');   // false
 isBlank([1,2,3]);         // false
 */
function isBlank(obj) {
  return isEmpty(obj) || (typeof obj === 'string' && obj.match(/\S/) === null);
}

function isFunction(func) {
  return typeof func === 'function';
}
function isString(str) {
  return typeof str === 'string';
}

function parseStringToNumber(text) {
  if (isBlank(text)) {
    return 0;
  }
  try {
    return parseInt(text, 10);
  } catch (error) {
    Logger.error(error);
    return 0;
  }
}

function isZeroVariable(variable) {
  if (!variable) return true;
  if (variable.length != null && variable.length <= 0) return true;
  if (typeof variable === 'object' && Object.keys(variable).length === 0) return true;
  return false;
}

function zeroVariable(variable, toNull = false) {
  if (!variable) return variable;
  if (typeof variable === 'string') return '';
  if (typeof variable === 'number' || typeof variable === 'bigint') return 0;
  if (typeof variable === 'function') return null;
  if (typeof variable === 'boolean') return false;
  if (variable.length != null) return toNull ? null : [];
  if (typeof variable === 'object') return toNull ? null : {};
  return undefined;
}

function camelize(str) {
  return str.replace(
    /(?:^\w|[A-Z]|\b\w)/g,
    (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase())
  )
    .replace(/\s+/g, '');
}

function sentenceCase(str) {
  return str.toLocaleLowerCase()
    .replace(/(?:^[^a-z]*)([a-z])/gi, (...args) => args[1].toLocaleUpperCase());
}

module.exports = {
  isNotSet,
  isNone,
  isEmpty,
  isBlank,
  isString,
  isFunction,
  parseStringToNumber,
  isZeroVariable,
  zeroVariable,
  camelize,
  sentenceCase
};
