/* eslint-disable no-plusplus */
import _ from 'lodash';

export {
  isNotSet, isNone, isEmpty, isBlank,
  isFunction, isString, isZeroVariable, zeroVariable,
  parseStringToNumber,
  camelize, sentenceCase
} from '../../../server/utils';

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

export default {
  groupBy,
  loadImage
};
