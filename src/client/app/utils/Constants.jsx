
const isLocal = window.location.hostname === 'localhost';

const HOST = isLocal ? 'http://localhost:5000' : '';
const END_POINT = `${HOST}/api/v1`;
const USER = `${END_POINT}/user`;
const GARDEN = `${END_POINT}/garden`;
const AI = `${END_POINT}/ai-central`;
const MAP = `${END_POINT}/map`;
const MAP_ENTITIES = `${MAP}/entities`;
const DATASET = `${AI}/datasets`;

export const apiEndpoints = {
  END_POINT,
  user: {
    SIGN_IN: `${USER}/signin`,
    SIGN_OUT: `${USER}/signout`,
    GET_SESSION: `${USER}/get-session`
  },
  GARDEN,
  garden: {
    ENVIRONMENT: `${GARDEN}/environment`,
    AUTH: `${GARDEN}/auth`
  },
  AI,
  ai: {
    CHECK_UPDATE: `${AI}/check-update`,
    DOWNLOAD: `${AI}/download`,
    DATASET,
    datasetItem: id => `${DATASET}/${id}`
  },
  MAP,
  map: {
    OBJECTS: MAP_ENTITIES,
    entities: {
      LIST: `${MAP_ENTITIES}/list`
    }
  }
};

export const wsEndpoints = {

};

export default {
  apiEndpoints,
  wsEndpoints
};
