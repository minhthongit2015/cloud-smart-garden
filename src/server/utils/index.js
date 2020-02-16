// @flow
/* eslint-disable no-plusplus */
const _ = require('lodash');
const { EventInterface } = require('./Interfaces');

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

function toEventName(event = new EventInterface()) {
  return camelize(`on ${event.typez || event.type}`);
}

function dispatchEvent(event = new EventInterface(), { listeners, eventTypesMap }, ...args) {
  if (eventTypesMap && event && event.type) {
    event.typez = eventTypesMap[event.type] || event.typez;
  }
  event.type = event.type || event.typez;
  const listener = listeners[toEventName(event)];
  if (isFunction(listener)) {
    listener(event, ...args);
  }
}

function buildEvent(event = new EventInterface(), value, name) {
  if (event instanceof Event) {
    return event;
  }
  event = { ...event };
  if (!event.currentTarget) {
    event.currentTarget = {};
  }
  event.currentTarget.name = name !== undefined
    ? name
    : (event.currentTarget.name || this.props.name);
  event.currentTarget.value = value !== undefined
    ? value
    : event.currentTarget.value;
  return event;
}

function get(object, prop) {
  return _.get(object, prop);
}

/**
 * @param {'key'} keyProp
 */
function autoKey(object, keyProp = 'key') {
  if (!object || typeof object !== 'object') return null;
  Object.entries(object).forEach(([key, prop]) => {
    prop[keyProp] = key;
  });
  return object;
}

function sameKey(object1, object2, sourceKey = 'key', destinationKey = 'key') {
  if (!object1 || !object2) return null;
  const object1Key = typeof object1 === 'string' ? object1 : object1[sourceKey];
  const object2Key = typeof object2 === 'string' ? object2 : object2[destinationKey];
  return object1Key === object2Key;
}

function findByKey(objectOrKey, inMapOrArray, sourceKey = 'key', destinationKey = 'key') {
  const targetKey = destinationKey == null ? sourceKey : destinationKey;
  const objectKey = typeof objectOrKey === 'string' ? objectOrKey : objectOrKey[sourceKey];
  return Array.isArray(inMapOrArray)
    ? inMapOrArray.find(item => sameKey(item, objectKey, targetKey, sourceKey))
    : (inMapOrArray[objectKey]
      || Object.values(inMapOrArray).find(item => sameKey(item, objectKey, targetKey, sourceKey)));
}

function findIndexByKey(objectOrKey, inMapOrArray, sourceKey = 'key', destinationKey = 'key') {
  const targetKey = destinationKey == null ? sourceKey : destinationKey;
  const objectKey = typeof objectOrKey === 'string' ? objectOrKey : objectOrKey[sourceKey];
  return Array.isArray(inMapOrArray)
    ? inMapOrArray.findIndex(item => sameKey(item, objectKey, targetKey, sourceKey))
    : (inMapOrArray[objectKey]
      || Object.values(inMapOrArray)
        .findIndex(item => sameKey(item, objectKey, targetKey, sourceKey)));
}

function hasKey(objectOrKey, inMapOrArray, sourceKey = 'key', destinationKey = 'key') {
  const foundItem = findByKey(objectOrKey, inMapOrArray, sourceKey, destinationKey);
  return !!foundItem;
}

function toOptions(objects = [], valueKey = 'key', labelKey = 'name', toValueKey = 'value', toLabelKey = 'label') {
  if (!objects) return objects;
  const objectArray = Array.isArray(objects)
    ? objects
    : Object.values(objects);
  return objectArray.map(
    object => (
      toValueKey in object && toLabelKey in object
        ? object
        : {
          [toValueKey]: object.value || object[valueKey],
          [toLabelKey]: object.label || object[labelKey]
        }
    )
  );
}

function fromOptions(objects = [], valueKey = 'value', labelKey = 'label') {
  return toOptions(objects, valueKey, labelKey, 'key', 'name');
}

function toggleByKey(selectedItems, items, itemOrItemKey, sourceKey = 'key', destinationKey = 'key') {
  const newArray = [...selectedItems];
  const foundIndex = findIndexByKey(itemOrItemKey, selectedItems, sourceKey, destinationKey);
  if (foundIndex < 0) {
    const newItem = findByKey(itemOrItemKey, items, sourceKey, destinationKey);
    newArray.push(newItem);
  } else {
    newArray.splice(foundIndex, 1);
  }
  return newArray;
}

function updateArray(oldArray, newArray, oldArrayKey = 'key', newArrayKey = 'key') {
  if (!oldArray || !Array.isArray(oldArray)
    || !newArray || !Array.isArray(newArray)) {
    return oldArray;
  }
  const array = oldArray.filter(element => hasKey(element, newArray, oldArrayKey, newArrayKey));
  array.push(...newArray.filter(element => !hasKey(element, oldArray, newArrayKey, oldArrayKey)));
  return array;
}

/**
 * Do not use! (not completed yet)
 */
function flattenObject(object, matcher) {
  const paths = [];
  function _walk(obj, parentPath = '') {
    Object.entries(obj).forEach(([key, value]) => {
      if (matcher && matcher(value)) {
        paths.push(`${parentPath}.${key}`);
      }
      if (typeof value !== 'object' || Array.isArray(value)) {
        return null;
      }
      return _walk(value, key);
    });
  }
  _walk(object);
  return paths;
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
  sentenceCase,
  toEventName,
  dispatchEvent,
  buildEvent,
  get,
  autoKey,
  sameKey,
  findByKey,
  findIndexByKey,
  hasKey,
  toOptions,
  fromOptions,
  toggleByKey,
  updateArray,
  flattenObject
};
