
const END_POINT = '/api/v1';
const USER = `${END_POINT}/user`;
const GARDEN = `${END_POINT}/garden`;
const AI = `${END_POINT}/ai`;
const MAP = `${END_POINT}/map`;
const MAP_ENTITIES = `${MAP}/entities`;

export const apiEndpoints = {
  END_POINT,
  user: {
    SIGN_IN: `${USER}/signin`,
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
    DOWNLOAD: `${AI}/download`
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
