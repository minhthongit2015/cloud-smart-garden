
const END_POINT = 'http://localhost:5000/api/v1';
const USER = `${END_POINT}/user`;
const GARDEN = `${END_POINT}/garden`;
const AI = `${END_POINT}/ai`;

export const apiEndpoints = {
  END_POINT,
  user: {
    SIGN_IN: `${USER}/signin`,
    GET_SESSION: `${USER}/get-session`
  },
  garden: {
    ENVIRONMENT: `${GARDEN}/environment`,
    AUTH: `${GARDEN}/auth`
  },
  ai: {
    CHECK_UPDATE: `${AI}/check-update`,
    DOWNLOAD: `${AI}/download`
  }
};

export default {
  apiEndpoints
};
