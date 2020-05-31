import { UserRole } from './Constants';

function ep(endpoint, query) {
  if (!query) {
    return endpoint;
  }

  // eslint-disable-next-line no-nested-ternary
  return !endpoint.includes('?')
    ? `${endpoint}?${query}`
    : `${endpoint}&${query}`;
}

function params(endpoint, queryParams) {
  const validParams = Object.entries(queryParams)
    .map(([key, value]) => (value != null ? `${key}=${value}` : null))
    .filter(param => param);
  return validParams.length > 0
    ? `${ep(endpoint, validParams.join('&'))}`
    : endpoint;
}

function where(endpoint, whereCondiction) {
  return params(endpoint, { where: JSON.stringify(whereCondiction) });
}

function whereIn(endpoint, key, inArray) {
  if (!key || !inArray) return endpoint;
  return where(endpoint, { [key]: { $in: inArray } });
}

function whereOrder(endpoint, order) {
  return where(endpoint, { order });
}

function whereOrder2(endpoint, order2) {
  return where(endpoint, { order2 });
}

function limit(endpoint, limitLength) {
  return params(endpoint, { limit: limitLength });
}

function offset(endpoint, offsetValue) {
  return params(endpoint, { offset: offsetValue });
}

function populate(endpoint, fields) {
  return where(endpoint, { populate: fields });
}

function model(endpoint, modelType) {
  return params(endpoint, { model: modelType });
}

function __t(endpoint, modelType) {
  return where(endpoint, { __t: modelType });
}

/**
 * @param  {...any} keys e.g: (..., '-_id', 'order', '-createdAt')
 */
function sort(endpoint, ...keys) {
  if (!keys || !keys.length) return endpoint;
  if (Array.isArray(keys[0])) {
    // eslint-disable-next-line prefer-destructuring
    keys = keys[0];
  }
  keys = keys.filter(key => key);
  return params(endpoint, {
    sort: keys.length > 0
      ? keys.join(' ')
      : null
  });
}

/**
 * Newest first
 */
function sortCreated(endpoint, ...keys) {
  return sort(endpoint, '-createdAt', ...keys);
}

// Utils

function subRoute(endpoint, ...sub) {
  const [path, query] = (endpoint && endpoint.split('?')) || [];
  const [, hash] = (query && query.split('#')) || [];
  return `${path || ''}${sub ? `/${sub.join('/')}` : ''}${query ? `?${query}` : ''}${hash ? `#${hash}` : ''}`;
}

function entityI(endpoint, ...sub) {
  return _id => subRoute(endpoint, _id, ...sub);
}

function orderI(endpoint) {
  return order => limit(where(endpoint, { order }), 1);
}

function order2I(endpoint) {
  return order => limit(where(endpoint, { order }), 1);
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

  subRoute(...sub) {
    return this.endpoint(subRoute(this._endpoint, sub));
  }

  entityI(_id, ...sub) {
    return this.endpoint(entityI(this._endpoint, ...sub)(_id));
  }

  orderI(order) {
    return this.endpoint(orderI(this._endpoint)(order));
  }

  order2I(order2) {
    return this.endpoint(order2I(this._endpoint)(order2));
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

  populate(fields) {
    return this.endpoint(populate(this._endpoint, fields));
  }

  limit(limitLength) {
    return this.endpoint(limit(this._endpoint, limitLength));
  }

  offset(offsetValue) {
    return this.endpoint(offset(this._endpoint, offsetValue));
  }

  model(modelType) {
    return this.endpoint(model(this._endpoint, modelType));
  }

  __t(modelType) {
    return this.endpoint(__t(this._endpoint, modelType));
  }

  sort(...keys) {
    return this.endpoint(sort(this._endpoint, ...keys));
  }

  sortCreated(...keys) {
    return this.endpoint(sortCreated(this._endpoint, ...keys));
  }
}

function builder(endpoint) {
  return new Builder(endpoint);
}

// ---

const host = '';
const APIv1 = subRoute(host, 'api', 'v1');

const admin = subRoute(APIv1, 'admin');

const intranet = subRoute(APIv1, 'intranet');
const oneHundredQuotes = subRoute(intranet, '100-Quotes');
const quoteI = entityI(oneHundredQuotes);
const nextLevel = subRoute(intranet, 'next-level');

const users = subRoute(APIv1, 'users');
const members = whereIn(users, 'role', Object.values(UserRole));
const characteristicsI = entityI(users, 'characteristics');
const targetCharacteristicsI = entityI(users, 'target-characteristics');
const createMark = entityI(users, 'marks');
const auth = subRoute(users, 'auth');
const signin = subRoute(users, 'signin');
const signout = subRoute(users, 'signout');
const fbAuth = subRoute(auth, 'facebook');

const social = subRoute(APIv1, 'social');
const socialI = entityI(social);
const socialOrderI = orderI(social);
const categories = subRoute(social, 'categories');
const news = subRoute(social, 'news');
const rating = subRoute(social, 'rating');
const ratingI = entityI(rating);
const savedSocialEntity = subRoute(social, 'saved');

const map = subRoute(APIv1, 'map');
const places = subRoute(map, 'places');
const placesSorted = sort(places, '-createdAt');
const placeI = entityI(places);
const placeOrderI = orderI(places);

const garden = subRoute(APIv1, 'garden');
const gardens = subRoute(garden, 'gardens');
const myGardens = subRoute(garden, 'my-garden');
const stations = subRoute(garden, 'stations');
const stationI = entityI(stations);
const userPlants = subRoute(stations, 'user-plants');
const setStationStateI = entityI(stations, 'set-state');
const records = subRoute(garden, 'records');
const generateRecords = subRoute(records, 'generate');
const plants = subRoute(garden, 'plants');

const AI = subRoute(APIv1, 'AI');
const projects = subRoute(AI, 'projects');
const experiments = subRoute(AI, 'experiments');
const experimentI = entityI(experiments);
const buildExperimentI = entityI(experiments, 'build');
const compareExperimentI = entityI(experiments, 'compare');
const stopTrainingI = entityI(experiments, 'stop-training');
const datasets = subRoute(AI, 'datasets');
const datasetI = entityI(datasets);
const regenerateDatasetIRecords = entityI(datasets, 'regenerate');
const trainedModels = subRoute(AI, 'trained-models');
const overrideModel = subRoute(trainedModels, 'override');

export default {
  ep,
  subRoute,
  entityI,
  orderI,
  order2I,
  params,
  where,
  whereIn,
  whereOrder,
  whereOrder2,
  limit,
  offset,
  populate,
  model,
  __t,
  sort,
  sortCreated,
  builder,

  APIv1,

  admin,

  intranet,
  oneHundredQuotes,
  quoteI,
  nextLevel,

  users,
  members,
  characteristicsI,
  targetCharacteristicsI,
  createMark,
  signin,
  signout,
  auth,
  fbAuth,

  social,
  socialI,
  socialOrderI,
  categories,
  news,
  rating,
  ratingI,
  savedSocialEntity,

  map,
  places,
  placesSorted,
  placeI,
  placeOrderI,

  garden,
  gardens,
  myGardens,
  stations,
  stationI,
  userPlants,
  setStationStateI,
  records,
  generateRecords,
  plants,

  AI,
  projects,
  experiments,
  experimentI,
  buildExperimentI,
  compareExperimentI,
  stopTrainingI,
  datasets,
  datasetI,
  regenerateDatasetIRecords,
  trainedModels,
  overrideModel
};
