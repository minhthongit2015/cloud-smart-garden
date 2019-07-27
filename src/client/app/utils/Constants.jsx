
const END_POINT = 'http://localhost:5000/api/v1';
const USER = `${END_POINT}/user`;
const GARDEN = `${END_POINT}/garden`;
const AI = `${END_POINT}/ai`;
const MAP = `${END_POINT}/map`;
const MAP_OBJECTS = `${MAP}/objects`;

export const apiEndPoints = {
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
    OBJECTS: MAP_OBJECTS,
    objects: {
      LIST: `${MAP_OBJECTS}/list`
    }
  }
};

export const wsEndPoints = {

};

export default {
  apiEndPoints,
  wsEndPoints
};
