
const apiEndPoint = '/api';
const aiCloudEndPoint = `${apiEndPoint}/AI-Cloud`;

const common = {
  apiEndPoint,
  aiCloudEndPoint
};

const development = {
  ...common,
  wsPort: 5000,
  wsEndPoint: 'ws://localhost:5000'
};

const production = {
  ...common,
  wsPort: process.env.PORT || 80,
  wsEndPoint: 'wss://cloud-smart-garden.herokuapp.com'
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
