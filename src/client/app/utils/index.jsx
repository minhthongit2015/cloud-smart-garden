/* eslint-disable no-plusplus */
import { get } from '../../../server/utils';

export {
  isNotSet, isNone, isEmpty, isBlank,
  isFunction, isString, isZeroVariable, zeroVariable,
  parseStringToNumber,
  camelize, sentenceCase,
  toEventName, dispatchEvent, buildEvent,
  get, autoKey, sameKey, findByKey, findIndexByKey,
  hasKey, toOptions, fromOptions, toggleByKey, updateArray,
  flattenObject
} from '../../../server/utils';


export function findMethodName(target, method) {
  let object = target;
  do {
    const methodNames = Object.getOwnPropertyNames(object);
    if (!methodNames) break;

    const foundMethodIndex = methodNames.findIndex(methodName => target[methodName] === method);
    if (foundMethodIndex >= 0) {
      return methodNames[foundMethodIndex];
    }

    object = Object.getPrototypeOf(object);
  } while (object);
  return null;
}

export function bindMethods(target, ...methods) {
  methods.forEach((method) => {
    if (!method) {
      console.error('Undefined method!');
      return;
    }
    target[findMethodName(target, method)] = method.bind(target);
  });
}

export function cacheValue(name, value) {
  localStorage[name] = JSON.stringify(value);
  return value;
}

export function getCachedValue(name, defaultValue) {
  try {
    return name in localStorage ? JSON.parse(localStorage[name]) : defaultValue;
  } catch {
    return localStorage[name];
  }
}

export function groupBy(array, property = '_id') {
  if (!array || !property) return null;
  if (!array.length) return {};
  const map = {};
  const unRecognizedItems = [];
  if (array[0][property] === undefined) {
    return array;
  }
  array.forEach((item) => {
    const keyValue = get(item, property);
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
        padding-top: calc(${ratio * 100}% - 1px);
        background: url(${url});
        background-size: ${imgWidth}px ${imgHeight}px;
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;
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
  getImage(url, { height, width, scale })
    .then((image) => {
      console.logImage(image);
    });
};

console.h1 = (text) => {
  const h1Style = `
    font-size: 2rem;
    font-weight: bold;
    font-family: 'icielz-bambola', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
    color: #ffd06b;
    padding: 30px;
    margin: 50px auto;
    text-align: center;
    border: 3px solid gold;
    border-image: linear-gradient(144deg, #ffeaa8 0%, #FFFFAC 4%, #ffe18d 12.5%, #f7d27d 31.25%, #fdca58 50%, #ffd77b 54%, #ffd06b 65%, #FDB931 80%, #fbe371 90%) 1;
    border-radius: 4px;
    overflow: hidden;
  `;
  console.log(`%c${text}`, h1Style);
};

console.h2 = (text) => {
  const h1Style = `
    font-size: 1.5rem;
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

console.highlight = (text) => {
  const h1Style = `
    font-size: 1.2rem;
    font-weight: bold;
    font-family: 'icielz-bambola', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
    padding: 5px 8px;
    margin: 5px auto;
    text-align: center;
    color: #fdca58;
    border: 3px solid gold;
    border-left: none;
    border-right: none;
    border-image: linear-gradient(144deg, #ffeaa8 0%, #FFFFAC 4%, #ffe18d 12.5%, #f7d27d 31.25%, #fdca58 50%, #ffd77b 54%, #ffd06b 65%, #FDB931 80%, #fbe371 90%) 1;
  `;
  console.log(`%c${text}`, h1Style);
};

console.badge = (text) => {
  const h1Style = `
    font-size: 1.2rem;
    font-weight: bold;
    font-family: 'icielz-bambola', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;
    padding: 5px 8px;
    margin: 5px auto;
    text-align: center;
    color: #fff;
    border-radius: 4px;
    background: linear-gradient(144deg, #ffeaa8 0%, #FFFFAC 4%, #ffe18d 12.5%, #f7d27d 31.25%, #fdca58 50%, #ffd77b 54%, #ffd06b 65%, #FDB931 80%, #fbe371 90%);
  `;
  console.log(`%c${text}`, h1Style);
};

console.test = (func, iteration = 10 ** 6) => {
  console.time();
  for (let index = 0; index < iteration; index++) {
    func();
  }
  console.timeEnd();
};


// AI Utils

export function layersAsArray(layers) {
  return Array.isArray(layers)
    ? layers
    : (layers || '').replace(/[^0-9,]/g, '')
      .split(',').map(layer => +layer).filter(layer => layer);
}

export function layersAsString(layers) {
  // eslint-disable-next-line no-nested-ternary
  return typeof layers === 'string'
    ? layers
    : (Array.isArray(layers) ? layers.join(',') : '');
}

export function buildTestKey(optimizer, loss, activation) {
  return `${optimizer.key}-${loss.key}-${activation.key}`;
}

export function generateTests(target) {
  const {
    algorithms, optimizers = [], losses = [], activations = []
  } = target || {};

  const tests = [];
  if (algorithms && optimizers && losses && activations) {
    optimizers.forEach((optimizer) => {
      losses.forEach((loss) => {
        activations.forEach((activation) => {
          tests.push({
            key: buildTestKey(optimizer, loss, activation),
            optimizer,
            loss,
            activation,
            active: true
          });
        });
      });
    });
  }

  return tests;
}

export default {
  layersAsArray,
  layersAsString,
  cacheValue,
  getCachedValue,
  findMethodName,
  bindMethods,
  groupBy,
  loadImage
};
