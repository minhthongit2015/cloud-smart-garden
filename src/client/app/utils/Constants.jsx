
const endPoint = 'http://localhost:5000/api/v1';
const user = `${endPoint}/user`;
const garden = `${endPoint}/garden`;
const ai = `${endPoint}/ai`;

export const API = {
  endPoint,
  user: {
    signin: `${user}/signin`,
    getSession: `${user}/get-session`
  },
  garden: {
    environment: `${garden}/environment`,
    auth: `${garden}/auth`
  },
  ai: {
    checkUpdate: `${ai}/check-update`,
    download: `${ai}/download`
  }
};

export default {
  API
};
