
const apiEndpoint = '/api';
const aiCloudEndpoint = `${apiEndpoint}/AI-Cloud`;

const common = {
  apiEndpoint,
  aiCloudEndpoint
};

const development = {
  ...common,
  wsPort: 5000,
  wsEndpoint: 'ws://localhost:5000/'
};

const production = {
  ...common,
  wsPort: process.env.PORT || 80,
  wsEndpoint: 'wss://yoth-garden.herokuapp.com'
};

const currentConfig = process.env.NODE_ENV === 'development'
  ? development
  : production;

export default {
  common,
  development,
  production,
  currentConfig
};
