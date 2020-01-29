import { UserRole } from './Constants';

function ep(endpoint) {
  // eslint-disable-next-line no-nested-ternary
  return !endpoint.includes('?')
    ? `${endpoint}?`
    : (endpoint.endsWith('&') ? endpoint : `${endpoint}&`);
}

function params(endpoint, queryParams) {
  return `${ep(endpoint)}${
    Object.entries(queryParams)
      .map(([key, value]) => (value ? `${key}=${value}` : null))
      .filter(param => param)
      .join('&')
  }`;
}

function where(endpoint, whereCondiction) {
  return params(endpoint, { where: JSON.stringify(whereCondiction) });
}

function whereIn(endpoint, key, inArray) {
  if (!key || !inArray) return endpoint;
  return where(endpoint, { [key]: { $in: inArray } });
}

function whereBaseOrder(endpoint, baseOrder) {
  return where(endpoint, { baseOrder });
}

function limit(endpoint, limitLength) {
  return params(endpoint, { limit: limitLength });
}

function offset(endpoint, offsetValue) {
  return params(endpoint, { offset: offsetValue });
}

function __t(endpoint, modelType) {
  return where(endpoint, { __t: modelType });
}

/**
 * @param  {...any} keys e.g: (..., '-_id', 'baseOrder', '-createdAt')
 */
function sort(endpoint, ...keys) {
  if (!keys) return endpoint;
  return params(endpoint, { sort: keys.join(' ') });
}

class Builder {
  constructor(endpoint) {
    this.endpoint(endpoint);
  }

  toString() {
    return this._endpoint;
  }

  endpoint(endpoint) {
    this._endpoint = endpoint;
    return this;
  }

  params(queryParams) {
    return this.endpoint(params(this._endpoint, queryParams));
  }

  where(whereCondiction) {
    return this.endpoint(where(this._endpoint, whereCondiction));
  }

  whereIn(key, inArray) {
    return this.endpoint(whereIn(this._endpoint, key, inArray));
  }

  whereBaseOrder(baseOrder) {
    return this.endpoint(whereBaseOrder(this._endpoint, baseOrder));
  }

  limit(limitLength) {
    return this.endpoint(limit(this._endpoint, limitLength));
  }

  offset(offsetValue) {
    return this.endpoint(offset(this._endpoint, offsetValue));
  }

  __t(modelType) {
    return this.endpoint(__t(this._endpoint, modelType));
  }

  sort(...keys) {
    return this.endpoint(sort(this._endpoint, ...keys));
  }
}

function builder(endpoint) {
  return new Builder(endpoint);
}

const host = '';
const APIv1 = `${host}/api/v1`;

const admin = `${APIv1}/admin`;

const intranet = `${APIv1}/intranet`;
const oneHundredQuotes = `${intranet}/100-Quotes`;
const quoteI = _id => `${oneHundredQuotes}/${_id}`;
const nextLevel = `${intranet}/next-level`;

const users = `${APIv1}/users`;
const members = whereIn(users, 'role', Object.values(UserRole));
const characteristics = _id => `${users}/${_id}/characteristics`;
const targetCharacteristics = _id => `${users}/${_id}/target-characteristics`;
const createMark = _id => `${users}/${_id}/marks`;
const auth = `${users}/auth`;
const signin = `${users}/signin`;
const signout = `${users}/signout`;
const fbAuth = `${auth}/facebook`;

const map = `${APIv1}/map`;
const places = `${map}/places`;
const placesSorted = sort(places, '-createdAt');
const placeI = _id => `${places}/${_id}`;
const placeOrderI = baseOrder => limit(where(places, { baseOrder }), 1);

const blog = `${APIv1}/blog`;
const posts = `${blog}/posts`;
const postI = _id => `${posts}/${_id}`;
const postOrder = baseOrder => where(posts, { baseOrder });
const news = `${posts}/news`;
const categories = `${blog}/categories`;
const rating = `${blog}/rating`;
const ratingI = _id => `${rating}/${_id}`;
const savedPosts = `${blog}/saved-posts`;

const garden = `${APIv1}/garden`;
const gardens = `${garden}/gardens`;
const stations = `${garden}/stations`;
const setStationState = `${stations}/set-state`;
const records = `${garden}/records`;
const generateRecords = `${records}/generate`;

const AI = `${APIv1}/AI`;
const projects = `${AI}/projects`;
const experiments = `${AI}/experiments`;
const experimentI = _id => `${experiments}/${_id}`;
const buildExperimentI = _id => `${experimentI(_id)}/build`;
const datasets = `${AI}/datasets`;
const datasetI = _id => `${datasets}/${_id}`;

export default {
  ep,
  params,
  where,
  whereIn,
  whereBaseOrder,
  limit,
  offset,
  __t,
  sort,
  builder,

  APIv1,

  admin,

  intranet,
  oneHundredQuotes,
  quoteI,
  nextLevel,

  users,
  members,
  characteristics,
  targetCharacteristics,
  createMark,
  signin,
  signout,
  auth,
  fbAuth,

  map,
  places,
  placesSorted,
  placeI,
  placeOrderI,

  blog,
  posts,
  postI,
  postOrder,
  news,
  categories,
  rating,
  ratingI,
  savedPosts,

  garden,
  gardens,
  stations,
  setStationState,
  records,
  generateRecords,

  AI,
  projects,
  experiments,
  experimentI,
  buildExperimentI,
  datasets,
  datasetI
};
