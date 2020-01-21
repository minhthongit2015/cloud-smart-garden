/* eslint-disable no-plusplus */
import _ from 'lodash';

const Logger = console;

/**
 isNone();              // true
 isNone(null);          // false
 isNone(undefined);     // true
 isNone('');            // false
 isNone([]);            // false
 isNone(function() {}); // false
 */
export function isNotSet(object) {
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
export function isNone(object) {
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
export function isEmpty(object) {
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
export function isBlank(obj) {
  return isEmpty(obj) || (typeof obj === 'string' && obj.match(/\S/) === null);
}

export function isFunction(func) {
  return typeof func === 'function';
}
export function isString(str) {
  return typeof str === 'string';
}

export function isZeroVariable(variable) {
  if (!variable) return true;
  if (variable.length != null && variable.length <= 0) return true;
  if (typeof variable === 'object' && Object.keys(variable).length === 0) return true;
  return false;
}

export function zeroVariable(variable, toNull = false) {
  if (!variable) return variable;
  if (typeof variable === 'string') return '';
  if (typeof variable === 'number' || typeof variable === 'bigint') return 0;
  if (typeof variable === 'function') return null;
  if (typeof variable === 'boolean') return false;
  if (variable.length != null) return toNull ? null : [];
  if (typeof variable === 'object') return toNull ? null : {};
  return undefined;
}

export function parseStringToNumber(text) {
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

export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    // eslint-disable-next-line no-await-in-loop
    await callback(array[index], index, array);
  }
}

export function groupBy(array, property = '_id') {
  if (!array || !property) return null;
  if (!array.length) return {};
  const map = {};
  const unRecognizedItems = [];
  if (!(property in array[0])) {
    return array;
  }
  array.forEach((item) => {
    const keyValue = _.get(item, property);
    if (!keyValue) {
      unRecognizedItems.push(item);
      return;
    }
    if (!(keyValue in map)) {
      map[keyValue] = [];
    }
    map[keyValue].push(item);
  });
  return (Object.keys(map).length > 0 && map) || groupBy(array, '_id');
}

export function camelize(str) {
  return str.replace(
    /(?:^\w|[A-Z]|\b\w)/g,
    (word, index) => (index === 0 ? word.toLowerCase() : word.toUpperCase())
  )
    .replace(/\s+/g, '');
}

export function sentenceCase(str) {
  return str.toLocaleLowerCase()
    .replace(/(?:^[^a-z]*)([a-z])/gi, (...args) => args[1].toLocaleUpperCase());
}

export function loadImage(url) {
  if (!url) return Promise.resolve(url);
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = reject;
    img.src = url;
  });
}

function getImage(url, { height, width, scale = 1 } = {}) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      if (width) {
        scale = width / img.width;
      }
      if (height) {
        scale = height / img.height;
      }
      const imgWidth = img.width * scale;
      const imgHeight = img.height * scale;
      const ratio = imgHeight / imgWidth;
      const imageStyle = `
        margin: 10px auto;
        height: 0;
        line-height: 0;
        color: transparent;
        padding-top: ${ratio * 100}%;
        background: url(${url});
        background-size: ${imgWidth}px ${imgHeight}px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: contain;
        border-radius: 4px;
        border: 1px solid lightblue;
      `;
      resolve(imageStyle);
    };
    img.onerror = reject;
    img.src = url;
  });
}
console.getImage = getImage;
console.imageSlot = `%c${''.padEnd(200, '_')}`;
console.logImage = (image) => {
  console.log(console.imageSlot, image);
};
console.image = (url, { height, width, scale } = {}) => {
  getImage(url, { height, width, scale }).then((image) => {
    console.logImage(image);
  });
};

console.h1 = (text) => {
  const h1Style = `
    font-size: 2rem;
    font-weight: bold;
    font-family: 'icielz-bambola', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
    color: #3287dc;
    padding: 30px;
    margin: 50px auto;
    border: 1px solid lightblue;
    border-radius: 4px;
    text-align: center;
  `;
  console.log(`%c${text}`, h1Style);
};

export default {
  isNotSet,
  isNone,
  isEmpty,
  isBlank,
  isString,
  isFunction,
  parseStringToNumber,
  asyncForEach,
  groupBy,
  camelize,
  loadImage
};
