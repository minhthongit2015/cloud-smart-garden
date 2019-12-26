import Runtime from '../utils/Runtime';

let wsEndpoint = `wss://${window.location.host}`;
if (Runtime.isLocal) {
  wsEndpoint = 'ws://localhost:5000';
}

let httpEndpoint = '';
if (Runtime.isLocal) {
  httpEndpoint = 'http://localhost:5000';
}


const apiEndpoint = '/api';
const aiCloudEndpoint = `${apiEndpoint}/AI-Cloud`;

const common = {
  wsEndpoint,
  httpEndpoint,
  apiEndpoint,
  aiCloudEndpoint,
  GOOGLE_CLOUD_API_KEY: 'AIzaSyADxVggO7uEHn1jKcEKKajCsEUPlKVtct8'
};

const developmentLocal = {
  FACEBOOK_APP_ID: '432738624087532'
};

const developmentStaging = {
  FACEBOOK_APP_ID: '2467127226704927'
};

const production = {
  FACEBOOK_APP_ID: '1102047903474317'
};

let currentConfig;
if (Runtime.isLocal) {
  currentConfig = developmentLocal;
} else if (Runtime.isStaging) {
  currentConfig = developmentStaging;
} else {
  currentConfig = production;
}

export default {
  ...common,
  ...currentConfig
};
