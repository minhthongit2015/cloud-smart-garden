
const isLocal = window.location.hostname === 'localhost';

const HOST = isLocal ? 'http://localhost:5000' : '';
const END_POINT = `${HOST}/api/v1`;
const USER = `${END_POINT}/users`;
const GARDENS = `${END_POINT}/gardens`;
const AI = `${END_POINT}/ai-central`;
const MAP = `${END_POINT}/map`;
const MAP_ENTITIES = `${MAP}/entities`;
const DATASET = `${AI}/datasets`;
const EXPERIMENT = `${AI}/experiments`;

export const ApiEndpoints = {
  END_POINT,
  user: {
    SIGN_IN: `${USER}/signin`,
    SIGN_OUT: `${USER}/signout`,
    GET_SESSION: `${USER}/get-session`,
    FB_LOGIN: `${USER}/auth/facebook`
  },
  GARDENS,
  gardens: {
    ENVIRONMENT: `${GARDENS}/environment`,
    AUTH: `${GARDENS}/auth`
  },
  AI,
  ai: {
    CHECK_UPDATE: `${AI}/check-update`,
    DOWNLOAD: `${AI}/download`,
    DATASET,
    datasets: {
      ITEM: id => `${DATASET}/${id}`
    },
    EXPERIMENT,
    experiments: {
      ITEM: id => `${EXPERIMENT}/${id}`,
      BUILD: id => `${EXPERIMENT}/${id}/build`
    }
  },
  MAP,
  map: {
    OBJECTS: MAP_ENTITIES,
    entities: {
      LIST: `${MAP_ENTITIES}/list`
    }
  }
};

export const UserTypes = {
  admin: 'admin',
  moderator: 'moderator'
};

export default {
  ApiEndpoints
};
